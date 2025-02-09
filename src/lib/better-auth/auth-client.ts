import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_CLIENT_URL_ORIGIN, // the base url of your auth server
});
