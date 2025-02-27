function checkOrError(key: string, env: string | undefined) {
  if (env !== undefined) {
    return env;
  }
  throw `No ${key}`;
}

export const NEXT_PUBLIC_ACCOUNT_URL = checkOrError(
  "NEXT_PUBLIC_ACCOUNT_URL",
  process.env.NEXT_PUBLIC_ACCOUNT_URL,
);

export const NEXT_PUBLIC_CLIENT_ID = checkOrError(
  "NEXT_PUBLIC_CLIENT_ID",
  process.env.NEXT_PUBLIC_CLIENT_ID,
);

export const NEXT_PUBLIC_QRBTF_API_ENDPOINT = checkOrError(
  "NEXT_PUBLIC_QRBTF_API_ENDPOINT",
  process.env.NEXT_PUBLIC_QRBTF_API_ENDPOINT,
);
