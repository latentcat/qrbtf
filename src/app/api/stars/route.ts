import { getGitHubStars } from "@/lib/server/count_service";

export async function GET() {
  const star_count = await getGitHubStars();
  return Response.json({
    star_count: star_count,
  });
}
