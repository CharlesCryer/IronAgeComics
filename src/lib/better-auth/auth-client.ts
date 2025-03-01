import { getBaseUrl } from "@/trpc/react";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: getBaseUrl(), // the base url of your auth server
  user: {
    changeEmail: {
      enabled: true,
    },
  },
});
