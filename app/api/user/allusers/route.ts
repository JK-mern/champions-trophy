import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.findMany({
      orderBy: { points: "desc" },
    });

  

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log("Error fetching user with highest points:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
