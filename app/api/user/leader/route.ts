import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.findFirst({
      orderBy: {
        points: "desc",
      },
      take: 1, 
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "No users found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log("Error fetching user with highest points:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
