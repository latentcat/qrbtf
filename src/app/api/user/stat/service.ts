import { connectToDatabase } from "@/lib/server/mongodb";
import { isSameDay } from "date-fns";
import { ObjectId } from "mongodb";

const USER_QRCODE_STAT_COLLECTION = "user_qrcode_stat";
const QRCODE_LOG_COLLECTION = "user_qrcode_log";

interface UserQrcodeStat {
  _id: ObjectId;
  generation_count: number;
  download_count: number;
  usage_count: number;
  last_generate_time: Date;
}

interface QrcodeLog {
  user_id?: string;
  type: string;
  params: any;
}

export async function getUserQrcodeStat(user_id: string) {
  const { db } = await connectToDatabase();
  const collection = db.collection<UserQrcodeStat>(USER_QRCODE_STAT_COLLECTION);

  let userStat = await collection.findOne({
    _id: new ObjectId(user_id),
  });

  if (userStat?.last_generate_time) {
    const now = new Date();
    if (!isSameDay(userStat.last_generate_time, now)) {
      userStat = await collection.findOneAndUpdate(
        { _id: userStat._id },
        {
          $set: {
            usage_count: 0,
            last_generate_time: now,
          },
        },
        {
          returnDocument: "after",
        },
      );
    }
  }
  return userStat;
}

export async function updateLastGenerate(user_id: string) {
  const { db } = await connectToDatabase();
  const collection = db.collection<UserQrcodeStat>(USER_QRCODE_STAT_COLLECTION);

  const userStat = await collection.findOne({ _id: new ObjectId(user_id) });
  const now = new Date();
  let newCount = 1;
  if (userStat && userStat.last_generate_time && userStat.usage_count) {
    if (isSameDay(userStat.last_generate_time, now)) {
      newCount = userStat.usage_count + 1;
    }
  }

  await collection.findOneAndUpdate(
    { _id: new ObjectId(user_id) },
    {
      $set: {
        usage_count: newCount,
        last_generate_time: now,
      },
    },
  );

  return newCount;
}

export async function incGenerationCount(user_id: string) {
  const { db } = await connectToDatabase();
  const collection = db.collection<UserQrcodeStat>(USER_QRCODE_STAT_COLLECTION);

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(user_id) },
    { $inc: { generation_count: 1 } },
    { upsert: true, returnDocument: "after" },
  );
  return result?.generation_count;
}

export async function incDownloadCount(user_id: string) {
  const { db } = await connectToDatabase();
  const collection = db.collection<UserQrcodeStat>(USER_QRCODE_STAT_COLLECTION);

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(user_id) },
    { $inc: { download_count: 1 } },
    { upsert: true, returnDocument: "after" },
  );
  return result?.download_count;
}

export async function logQrcode(data: QrcodeLog) {
  const { db } = await connectToDatabase();
  const collection = db.collection<QrcodeLog>(QRCODE_LOG_COLLECTION);

  const result = await collection.insertOne(data);
  return result;
}
