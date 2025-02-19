import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  const { matchId, result } = await request.json();
  const matches = await prisma.matches.update({
    where: {
      id: matchId,
    },
    data: {
      result: result,
    },
  });

  const users = await prisma.resultPrediction.findMany({
    where: { matchId: matchId, predictedresult: result },
  });

 
  const userPoints = await prisma.user.updateMany({
    where: {
      id: { 
        in: users.map((user) => user.userId),
      },
    },
    data: { points: { increment: 1 } },
  });


  return new Response(JSON.stringify(matches), { status: 200 });
}
