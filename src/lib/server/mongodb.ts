import { Db, MongoClient } from "mongodb";
import {
  MONGODB_CONNECTION_STRING,
  MONGODB_QRCODE_DB_NAME,
} from "../env/server";

let cachedClient: MongoClient;
let cachedDbs: { [key: string]: Db } = {};

export async function connectToDatabase(
  dbName: string = MONGODB_QRCODE_DB_NAME,
) {
  if (cachedClient && cachedDbs[dbName]) {
    return {
      client: cachedClient,
      db: cachedDbs[dbName],
    };
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_CONNECTION_STRING);
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
