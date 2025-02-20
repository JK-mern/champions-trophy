import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Query parameter is required" }), {
      status: 400,
    });
  }

  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  const res = await prisma.resultPrediction.findMany({
    where: { userId },
    include: { match: true },
    orderBy: { matchId: "asc" },
  });

  const filteredData = res.map((prediction) => ({
    team1: prediction.match.team1,
    team2: prediction.match.team2,
    date: prediction.match.date,
    result: prediction.match.result,
    predictedResult: prediction.predictedresult,
  }));

  return Response.json(filteredData, { status: 200 });
}
