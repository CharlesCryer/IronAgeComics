import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { comics } from "@/server/db/schema";
import { like, eq } from "drizzle-orm";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { env } from "@/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const S3 = new S3Client({
  region: "auto",
  endpoint: env.R2_API_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY,
    secretAccessKey: env.R2_SECRET_KEY,
  },
});

export const comicRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const comics = await ctx.db.query.comics.findMany();

    const comicsWithUrls = await Promise.all(
      comics.map(async (comic) => {
        const command = new GetObjectCommand({
          Bucket: env.R2_BUCKET_NAME,
          Key: comic.imageKey!,
        });
        const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
        return { ...comic, url: url };
      }),
    );

    return comicsWithUrls;
  }),
  search: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const comicsList = await ctx.db
      .select()
      .from(comics)
      .where(like(comics.name, `%${input}%`));
    const comicsWithUrls = await Promise.all(
      comicsList.map(async (comic) => {
        const command = new GetObjectCommand({
          Bucket: env.R2_BUCKET_NAME,
          Key: comic.imageKey!,
        });
        const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
        return { ...comic, url: url };
      }),
    );
    return comicsWithUrls;
  }),
  getAllFromSellerId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const comicsList = await ctx.db
        .select()
        .from(comics)
        .where(eq(comics.sellerId, input));

      const comicsWithUrls = await Promise.all(
        comicsList.map(async (comic) => {
          const command = new GetObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: comic.imageKey!,
          });
          const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
          return { ...comic, url: url };
        }),
      );

      return comicsWithUrls;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.string(),
        sellerId: z.string(),
        imageName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const signedURL = await getSignedUrl(
        S3,
        new PutObjectCommand({
          Bucket: env.R2_BUCKET_NAME,
          Key: uuidv4(),
        }),
        { expiresIn: 3600 },
      );
      await ctx.db
        .insert(comics)
        .values({
          name: input.name,
          price: input.price,
          sellerId: input.sellerId,
          imageKey: input.imageName,
        })
        .returning();

      return signedURL;
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const comic = await ctx.db
      .delete(comics)
      .where(eq(comics.id, input))
      .returning();
    if (!!comic[0] && !!comic[0].imageKey) {
      S3.send(
        new DeleteObjectCommand({
          Bucket: env.R2_BUCKET_NAME,
          Key: comic[0].imageKey,
        }),
      );
    }
  }),
});
