import "server-only";

const env = new Proxy(process.env, {
  get(target, prop) {
    const val = target[prop as string];
    if (val === undefined) {
      throw `No ${prop.toString()}`;
    }
    return val;
  },
}) as Record<string, string>;

export const {
  SESSION_SECRET,
  MONGODB_CONNECTION_STRING,
  MONGODB_QRCODE_DB_NAME,
  INTERNAL_API_ENDPOINT,
  INTERNAL_API_KEY,
} = env;
