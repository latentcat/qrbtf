export async function GET() {
  const res = await fetch('https://api.github.com/repos/latentcat/qrbtf', {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })
  const data = await res.json()

  let star_count = undefined
  try {
    star_count = data["stargazers_count"]
  } catch {
    console.log("[GitHub API Error]")
  }

  return Response.json({
    star_count: star_count
  })
}