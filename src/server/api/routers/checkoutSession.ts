import { comicsSelectSchema } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Stripe } from "stripe";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const checkoutSessionRouter = createTRPCRouter({
  create: publicProcedure
    .input(comicsSelectSchema.array().min(1))
    .mutation(async ({ input }) => {
      const shoppingCartItems = input;
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: shoppingCartItems.map((item) => ({
          price_data: {
            unit_amount: Number(item.price) * 100,
            currency: "nzd",
            product_data: {
              name: item.name,
            },
          },
          quantity: 1,
        })),
        mode: "payment",
        return_url: `${env.NEXT_PUBLIC_CLIENT_URL_ORIGIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      });
      if (session.client_secret === null) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
      return session.client_secret;
    }),
});
