import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from "@/constants/env_values";

import { db } from "@/db";

if (!BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET has not been set. Configure it in .dev.vars (locally) or " +
      "as a Cloudflare secret (prod) with `wrangler secret put BETTER_AUTH_SECRET`.",
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      // Egne felter på user-tabellen kan defineres her.
      // Eksempel: bio: { type: "string", required: false }
    },
  },

  plugins: [
    // Gir oss roller (user / admin), ban, impersonate, set-role
  ],
});

export type Session = typeof auth.$Infer.Session;
