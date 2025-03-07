import { getBaseUrl } from "@/trpc/react";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: getBaseUrl(), // the base url of your auth server
  user: {
    additionalFields: {
      hasAdministratorPrivileges: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false, // don't allow user to set role
      },
    },
    changeEmail: {
      enabled: true,
    },
  },
});
