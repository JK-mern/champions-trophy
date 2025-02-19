import { prisma } from "@/lib/prisma";

export   async function POST (request : Request) {
const {userId , matchId,predictedResult} = await request.json();
const result = await prisma.resultPrediction.create({
data: {
userId: userId,
matchId: matchId,
predictedresult: predictedResult        
},
})
return new Response(JSON.stringify(result), { status: 200 });


}