import { memoryCache } from "./memory_cache";
import { connectToDatabase } from "./mongodb";

export async function validateBlacklist(url: string) {
  const blacklist = await memoryCache("blacklist", async () => {
    const { db } = await connectToDatabase();
    const collection = db.collection<{
      type: "include" | "startwith" | "endwith";
      value: string;
    }>("url_filters");
    return await collection.find({}).toArray();
  });

  for (const entry of blacklist) {
    switch (entry.type) {
      case "startwith":
        if (url.startsWith(entry.value)) {
          return false;
        }
      case "endwith":
        if (url.endsWith(entry.value)) {
          return false;
        }
      case "include":
        if (url.includes(entry.value)) {
          return false;
        }
    }
  }
  return true;
}
