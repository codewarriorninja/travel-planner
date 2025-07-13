import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";


async function geocodeAddress(address:string){
    const apiKey = process.env.GOOGLE_MAPS_API_KEY!
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      if (!response.ok) throw new Error("Geocoding failed");

      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
}

export async function POST( req: NextRequest,
    { params }: { params: { tripId: string } }){

        const session = await requireAuth();

        if(!session){
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 }); 
        }

        const formData = await req.formData();
        const address = formData.get("address")?.toString();
      
        if (!address) {
          return NextResponse.json({ error: "Missing address" }, { status: 400 });
        }

        let lat: number, lng: number;
        try {
          ({ lat, lng } = await geocodeAddress(address));
        } catch {
          return NextResponse.json({ error: "Bad address" }, { status: 422 });
        }

        const { tripId } = params;

  const order = await prisma.location.count({ where: { tripId } });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order,
    },
  });
  return NextResponse.json({ ok: true, redirect: `/trips/${tripId}` });
    }