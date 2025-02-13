import "server-only";

import { env } from ".";

export const {
  SESSION_SECRET,
  MONGODB_CONNECTION_STRING,
  INTERNAL_API_ENDPOINT,
  INTERNAL_API_KEY,
} = env;
