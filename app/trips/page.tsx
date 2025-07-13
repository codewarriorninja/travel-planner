import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, MapPin, Plus, Plane, Clock, ArrowRight } from "lucide-react";

const Trip = async () => {
  const session = await requireAuth();
  const trips = await prisma.trip.findMany({
    where: { userId: session.user?.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  const pastTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) < today
  );

  const formatDateRange = (startDate: string | Date, endDate: string | Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    
    if (start.getFullYear() !== new Date().getFullYear()) {
      options.year = 'numeric';
    }
    
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  const getDaysUntil = (date: string | Date) => {
    const tripDate = new Date(date);
    const diffTime = tripDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Travel Dashboard
                </h1>
              </div>
              <p className="text-blue-100 text-lg mb-4">
                Welcome back, <span className="font-semibold text-white">{session.user?.name}</span>
              </p>
              <p className="text-blue-100/90 max-w-md">
                {trips.length === 0
                  ? "Start planning your first adventure by creating a new trip."
                  : `You have ${trips.length} ${trips.length === 1 ? "trip" : "trips"} planned. ${
                      upcomingTrips.length > 0
                        ? `${upcomingTrips.length} upcoming.`
                        : "All your trips are memories now."
                    }`}
              </p>
            </div>
            
            <Link href="/trips/new">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-xl font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                New Trip
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        {trips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Trips</p>
                    <p className="text-2xl font-bold text-gray-900">{trips.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingTrips.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{pastTrips.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Trips Section */}
        <div className="space-y-8">
          {trips.length === 0 ? (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Plane className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No trips yet
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Start planning your adventure by creating your first trip.
                  </p>
                  <Link href="/trips/new">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-xl">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First Trip
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Upcoming Trips */}
              {upcomingTrips.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    Upcoming Adventures
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingTrips.slice(0, 6).map((trip, key) => {
                      const daysUntil = getDaysUntil(trip.startDate);
                      return (
                        <Card key={key} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
                          <div className="h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {trip.title}
                              </CardTitle>
                              <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                              {trip.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                            </div>
                            <Link href={`/trips/${trip.id}`}>
                              <Button variant="ghost" className="w-full justify-between group-hover:bg-blue-50 transition-colors">
                                View Details
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recent/Past Trips */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  {pastTrips.length > 0 ? "Recent Memories" : "Your Trips"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(pastTrips.length > 0 ? pastTrips : sortedTrips).slice(0, 6).map((trip, key) => {
                    const isCompleted = new Date(trip.startDate) < today;
                    return (
                      <Card key={key} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
                        <div className={`h-2 ${isCompleted ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gradient-to-r from-blue-400 to-indigo-500'}`}></div>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {trip.title}
                            </CardTitle>
                            {isCompleted && (
                              <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                Completed
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            {trip.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                          </div>
                          <Link href={`/trips/${trip.id}`}>
                            <Button variant="ghost" className="w-full justify-between group-hover:bg-purple-50 transition-colors">
                              View Details
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trip;