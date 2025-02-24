const cache = new Map();

export async function memoryCache(
  key: string,
  generator: () => unknown | Promise<unknown>,
  ttlSeconds: number = 10 * 60, // 10 minutes
) {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && now < cached.expiry) {
    return cached.value;
  }

  const value = await Promise.resolve(generator());
  cache.set(key, {
    value,
    expiry: now + ttlSeconds * 1000,
  });

  return value;
}
