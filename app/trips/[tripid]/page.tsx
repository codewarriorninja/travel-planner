import TripDetailClient from "@/components/trip-detail";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TripDetail = async({params}:{params:Promise<{tripId:string}>}) => {

    const { tripId } = await params;

    const session = await requireAuth();

    if(!session) return <div>Please sign in.</div>

    const trip = await prisma.trip.findFirst({
        where:{id: tripId, userId: session.user?.id},
        include:{locations:true}
    })

    if (!trip) {
        return <div> Trip not found.</div>;
    }

  return (
    <>
    <TripDetailClient trip={trip} />
    </>
  )
}

export default TripDetail