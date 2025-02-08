import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { comics } from "@/server/db/schema";
import { like } from "drizzle-orm";
import { log } from "console";

export const comicRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const comic = await ctx.db.query.comics.findMany();
    log(comic);
    return comic;
  }),
  search: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db
      .select()
      .from(comics)
      .where(like(comics.name, `%${input}%`));
  }),
});
