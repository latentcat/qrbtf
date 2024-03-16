import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_CONNECTION_STRING || "";

let cachedClient: MongoClient;
let cachedDbs: { [key: string]: Db } = {};

export async function connectToDatabase(dbName: string = "qrcode") {
  if (cachedClient && cachedDbs[dbName]) {
    return {
      client: cachedClient,
      db: cachedDbs[dbName],
    };
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  let db = cachedClient.db(dbName);

  // set cache
  cachedDbs[dbName] = db;

  return {
    client: cachedClient,
    db: cachedDbs[dbName],
  };
}
