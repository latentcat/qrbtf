import { LatentCatAuth } from "@/lib/latentcat-auth/route";

const handler = LatentCatAuth();

export { handler as GET, handler as POST };
