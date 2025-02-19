import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { team1, team2,date } = await request.json();
  const matches = await prisma.matches.create({
    data: {
      team1: team1,
      team2: team2,
      date : date
    },
  });
  return new Response(JSON.stringify(matches), { status: 200 });
}


