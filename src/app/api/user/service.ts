import { UserTier } from "@/auth";
import { connectToDatabase } from "@/lib/server/mongodb";
import { ObjectId } from "mongodb";
import { User } from "next-auth";

export async function checkAndUpdateUserTier(user: User) {
  const now = new Date();
  if (
    user.tier == UserTier.Alpha &&
    user.subscribe_expire &&
    now > user.subscribe_expire
  ) {
    const user_collections = (
      await connectToDatabase("lc_auth")
    ).db.collection<User>("users");
    const updatedUser = await user_collections.findOneAndUpdate(
      {
        _id: new ObjectId(user.id),
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
    return updatedUser?.tier;
  }
  return user.tier;
}
