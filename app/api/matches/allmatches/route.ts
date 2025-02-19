import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const matches = await prisma.matches.findMany({});


    return new Response(JSON.stringify(matches), { status: 200 });
  } catch (error) {
    console.log("Error fetching user with highest points:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
