import { addCount, getGitHubStars } from "@/lib/server/count_service";

export async function POST(request: Request) {
  const res = await request.json();
  const result = await addCount(res["collection_name"], res["name"]);
  return Response.json({
    count: result || null,
  });
}
