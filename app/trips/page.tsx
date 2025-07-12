import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma";
import Link from "next/link";


const Trip = async() => {
    const session = await requireAuth();

    const trips = await prisma.trip.findMany({
        where:{userId:session.user?.id}
    })

    const sortedTrips = [...trips].sort(
        (a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )

    const today = new Date();
    today.setHours(0,0,0,0);
    const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
    )

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Link href={'/trips/new'}>
            <Button className="cursor-pointer">New Trip</Button>
            </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, {session.user?.name}</CardTitle>
          </CardHeader>

          <CardContent>
            <p>
              {" "}
              {trips.length === 0
              ? "Start planning your first trip by clicking the button above."
              : `You have ${trips.length} ${
                trips.length === 1 ? "trip" :'trips'
              } planned. ${
                upcomingTrips.length > 0 
                ? `${upcomingTrips.length} upcoming.`
                :" "
              }`
              }
            </p>
          </CardContent>
        </Card>

        <div>
            <h2 className="text-xl font-semibold mb-4">Your Recent Trips</h2>
            {trips.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                    <h3 className="text-xl font-medium mb-2"> No trips yet.</h3>
                    <p className="text-center mb-4 max-w-md"> Start planning your adventure by creating your first trip.</p>
                    <Link
                     href={'/trips/new'}
                    >
                        <Button className="cursor-pointer">New Trip</Button>
                    </Link>
                    </CardContent>
                </Card>
            ):(
             <div>
                
             </div>
            )}
        </div>
    </div>
  )
}

export default Trip