"use client";
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useShoppingCartContext } from "@/context/shoppingCartContext";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { env } from "@/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

export default function Page() {
  const { currentShoppingCart } = useShoppingCartContext();
  const checkoutMutation = api.checkoutSession.create.useMutation();
  const router = useRouter();

  const fetchClientSecret = useCallback(async () => {
    if (currentShoppingCart.length <= 0) {
      router.push("/empty-cart");
      return "";
    }
    const data = await checkoutMutation.mutateAsync(currentShoppingCart);
    return data;
  }, [checkoutMutation, currentShoppingCart, router]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
