"use client";
import { useCallback, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useShoppingCartContext } from "@/context/shoppingCartContext";
import { createCheckoutSession } from "@/Services/api/CheckoutSession";
import { useRouter } from "next/navigation";
import { env } from "@/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

export default function Page() {
  const { currentShoppingCart } = useShoppingCartContext();
  const router = useRouter();
  useEffect(() => {
    if (currentShoppingCart.length == 0) {
      router.push("/empty-cart");
    }
  }, [currentShoppingCart.length, router]);

  const fetchClientSecret = useCallback(
    () =>
      createCheckoutSession(currentShoppingCart)
        .then((data) => {
          return data.clientSecret;
        })
        .catch((err) => console.log(err)),
    [currentShoppingCart],
  );

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
