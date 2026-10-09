import { env } from "cloudflare:workers";

export const CLIENTID = env.CLIENT_ID;
export const CLIENTSECRET = env.CLIENT_SECRET;
export const PUBLIC_AUTHENTICATION_URL_BASE =
  env.PUBLIC_AUTHENTICATION_URL_BASE;
export const GRANT_TYPE = env.GRANT_TYPE;
export const PUBLIC_BASE_URL = env.PUBLIC_BASE_URL;
