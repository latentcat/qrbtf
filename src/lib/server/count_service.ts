import { connectToDatabase } from "@/lib/server/mongodb";
import { ObjectId } from "mongodb";

interface CounterOrm {
  _id?: ObjectId;
  count: number;
}

export async function getCount(collection_name: string, name: string) {
  const { client, db } = await connectToDatabase();

  const collection = db.collection<CounterOrm>(collection_name);

  const query = { name: name };
  const result = await collection.findOne(query);

  return result?.count;
}

export async function addCount(collection_name: string, name: string) {
  const { client, db } = await connectToDatabase();

  const collection = db.collection<CounterOrm>(collection_name);

  const query = { name: name };
  const result = await collection.findOneAndUpdate(
    query,
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" },
  );

  return result?.count;
}

export async function getGitHubStars() {
  const res = await fetch("https://api.github.com/repos/latentcat/qrbtf", {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  const data = await res.json();

  let star_count = undefined;
  try {
    star_count = data["stargazers_count"];
  } catch {
    console.log("[GitHub API Error]");
  }

  return star_count;
}
