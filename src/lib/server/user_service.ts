import {
  PaymentMethod,
  QrbtfUserData,
  UserTier,
} from "@/lib/latentcat-auth/common";
import { connectToDatabase } from "@/lib/server/mongodb";
import { ObjectId } from "mongodb";

export async function checkAndUpdateUser(
  userId: string,
): Promise<Partial<QrbtfUserData>> {
  const now = new Date();
  const userCollection = (await connectToDatabase()).db.collection<
    Partial<QrbtfUserData>
  >("users");

  const objectId = new ObjectId(userId);

  let user = await userCollection.findOne({
    _id: objectId,
  });

  if (!user) {
    await userCollection.insertOne({
      _id: objectId,
      tier: UserTier.Trial,
      payment: PaymentMethod.None,
    });
    user = (await userCollection.findOne({
      _id: objectId,
    }))!;
  }

  if (
    user.tier == UserTier.Pro &&
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
