export function safeParseJSON(str: string) {
  try {
    const result = JSON.parse(str);
    return result;
  } catch {
    return undefined;
  }
}
