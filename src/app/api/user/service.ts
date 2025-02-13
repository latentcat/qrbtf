import { QrbtfUserData, UserTier } from "@/lib/latentcat-auth/common";
import { connectToDatabase } from "@/lib/server/mongodb";
import { ObjectId } from "mongodb";

export async function checkAndUpdateUser(
  userId: string,
): Promise<QrbtfUserData> {
  const now = new Date();
  const userCollection = (
    await connectToDatabase()
  ).db.collection<QrbtfUserData>("users");

  const objectId = new ObjectId(userId);

  let user = await userCollection.findOneAndUpdate(
    {
      _id: objectId,
    },
    {
      $set: { _id: objectId },
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  );

  user = user!;

  if (
    user.tier == UserTier.Alpha &&
    user.subscribe_expire &&
    now > user.subscribe_expire
  ) {
    user = await userCollection.findOneAndUpdate(
      {
        _id: objectId,
      },
      {
        $set: {
          tier: UserTier.Trial,
        },
      },
      {
        returnDocument: "after",
      },
    );
  }
  return user!;
}
