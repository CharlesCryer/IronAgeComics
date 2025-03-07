import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { comics, type comicSelectModel } from "@/server/db/schema";
import { like, eq, desc } from "drizzle-orm";
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

    return await addURLToImages(comics);
  }),
  search: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const comicsList = await ctx.db
      .select()
      .from(comics)
      .where(like(comics.name, `%${input}%`));

    return await addURLToImages(comicsList);
  }),
  getAllFromSellerId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const comicsList = await ctx.db
        .select()
        .from(comics)
        .where(eq(comics.sellerId, input));

      return await addURLToImages(comicsList);
    }),
  getComicsWithHighestPrice: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const comicsList = await ctx.db
        .select()
        .from(comics)
        .orderBy(desc(comics.price))
        .limit(input);

      return await addURLToImages(comicsList);
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
      const imageKey = uuidv4();
      const signedURL = await getSignedUrl(
        S3,
        new PutObjectCommand({
          Bucket: env.R2_BUCKET_NAME,
          Key: imageKey,
        }),
        { expiresIn: 3600 },
      );
      await ctx.db
        .insert(comics)
        .values({
          name: input.name,
          price: input.price,
          sellerId: input.sellerId,
          imageKey: imageKey,
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
      await S3.send(
        new DeleteObjectCommand({
          Bucket: env.R2_BUCKET_NAME,
          Key: comic[0].imageKey,
        }),
      );
    }
  }),
});

/**
 * Gets a signed URL for object with corresponding imageKey from R2 bucket
 * adds it to a 'url' field for all comics in the list
 * @param comics
 * @returns
 */
async function addURLToImages(comics: comicSelectModel[]) {
  const comicsWithURLs = await Promise.all(
    comics.map(async (comic) => {
      const command = new GetObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: comic.imageKey!,
      });
      const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
      return { comic: comic, url: url };
    }),
  );

  return comicsWithURLs;
}
