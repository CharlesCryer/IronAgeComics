import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db";

export const auth = betterAuth({
  user: {
    additionalFields: {
      hasAdministratorPrivileges: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false, // don't allow user to set role
      },
    },
    changeEmail: {
      enabled: true,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
