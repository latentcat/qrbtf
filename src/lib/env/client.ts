import { env, isDev } from ".";

export const NEXT_PUBLIC_AUTH_CALLBACK_URL = isDev
  ? "http://localhost:3000/api/auth/callback"
  : env["NEXT_PUBLIC_AUTH_CALLBACK_URL"];

export const { NEXT_PUBLIC_CLIENT_ID } = env;
