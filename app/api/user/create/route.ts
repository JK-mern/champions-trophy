import { prisma } from "@/lib/prisma";

export async function POST(request : Request) {
    const {fullName} = await request.json();
    const user = await prisma.user.create({
        data: {
            fullname : fullName,

        }
    })
    return new Response(JSON.stringify(user), {status: 200});     

}