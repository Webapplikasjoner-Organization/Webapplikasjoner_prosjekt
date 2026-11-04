import type { User } from "@/db/schema/user-schema";

export type SessionUser = {
  id: string;
  email: string;
  username?: string | null;
};
