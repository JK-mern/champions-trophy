import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
   const {id} = await  params

  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  const res = await prisma.resultPrediction.findMany({
    where: { userId },
    include: { match: true },
    orderBy : {matchId : "asc"}
  });

  const filteredData = res.map((prediction) => ({
    team1: prediction.match.team1,
    team2: prediction.match.team2,
    date: prediction.match.date,
    result: prediction.match.result,
    predictedResult: prediction.predictedresult,
  }));

  return new Response(JSON.stringify(filteredData), { status: 200 });
}
