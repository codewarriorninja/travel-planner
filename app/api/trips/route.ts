import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(request:Request) {

    //check authentication
    const session = await requireAuth();
    if(!session || !session.user?.id){
        return NextResponse.json({
            message:'Not authenticated'},
        {
        status:401}
    );
    }

    const formData = await request.formData();

    const title       = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl    = formData.get("imageUrl")?.toString();
    const startDateStr= formData.get("startDate")?.toString();
    const endDateStr  = formData.get("endDate")?.toString();

    if(!title || !description || !startDateStr || !endDateStr){
        return NextResponse.json({
            message:'All fields are required.'
        },{status:400})
    }

    const startDate = new Date(startDateStr);
    const endDate   = new Date(endDateStr);

    await prisma.trip.create({
        data:{
            title,
            description,
            imageUrl,
            startDate,
            endDate,
            userId:session.user.id
        },
    });

    return NextResponse.json({message:'Trip created'}, {status:201})
}