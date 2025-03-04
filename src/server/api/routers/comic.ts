import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { comics } from "@/server/db/schema";
import { like, eq } from "drizzle-orm";

export const comicRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const comic = await ctx.db.query.comics.findMany();
    return comic;
  }),
  search: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db
      .select()
      .from(comics)
      .where(like(comics.name, `%${input}%`));
  }),
  getAllFromSellerId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(comics)
        .where(eq(comics.sellerId, input));
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.string(),
        sellerId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newComic = await ctx.db
        .insert(comics)
        .values({
          name: input.name,
          price: input.price,
          sellerId: input.sellerId,
        })
        .returning();

      return newComic;
    }),
});
