export const isDev = process.env.NODE_ENV === "development";

export const env = new Proxy(process.env, {
  get(target, prop) {
    const val = target[prop as string];
    if (val === undefined) {
      throw `No ${prop.toString()}`;
    }
    return val;
  },
}) as Record<string, string>;
