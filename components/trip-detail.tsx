"use client";

import { Location, Trip } from "@/generated/prisma";
import Image from "next/image";
import { Calendar, MapPin, Plus, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import Map from "@/components/map";
import SortableItinerary from "./sortable-itinerary";

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tripDuration = Math.round(
    (trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="relative mb-8">
          {trip.imageUrl && (
            <div className="w-full h-80 md:h-96 overflow-hidden rounded-2xl shadow-2xl relative group">
              <Image
                src={trip.imageUrl}
                alt={trip.title}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {trip.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{tripDuration} day{tripDuration !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{trip.locations.length} location{trip.locations.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* No Image Fallback */}
          {!trip.imageUrl && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {trip.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{tripDuration} day{tripDuration !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{trip.locations.length} location{trip.locations.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Floating Add Location Button */}
          <div className="absolute top-4 right-4">
            <Link href={`/trips/${trip.id}/location/new`}>
              <Button className="bg-white/90 hover:bg-white text-gray-900 shadow-lg backdrop-blur-sm border-0 rounded-full px-6 py-3 font-semibold transition-all duration-200 hover:shadow-xl hover:scale-105">
                <Plus className="mr-2 h-5 w-5" />
                Add Location
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-gray-50/50 border-b border-gray-200/50 rounded-none h-16 p-1">
              <TabsTrigger 
                value="overview" 
                className="flex-1 text-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 rounded-xl mx-1"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="itinerary" 
                className="flex-1 text-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 rounded-xl mx-1"
              >
                Locations
              </TabsTrigger>
              <TabsTrigger 
                value="map" 
                className="flex-1 text-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 rounded-xl mx-1"
              >
                Map
              </TabsTrigger>
            </TabsList>

            <div className="p-8">
              <TabsContent value="overview" className="space-y-8 mt-0">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Trip Summary Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Trip Summary</h2>
                    <div className="space-y-6">
                      <div className="flex items-start group">
                        <div className="bg-blue-100 rounded-full p-3 mr-4 group-hover:bg-blue-200 transition-colors duration-200">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Duration</p>
                          <p className="text-gray-600">
                            {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                          </p>
                          <p className="text-sm text-blue-600 font-medium">
                            {tripDuration} day{tripDuration !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start group">
                        <div className="bg-green-100 rounded-full p-3 mr-4 group-hover:bg-green-200 transition-colors duration-200">
                          <MapPin className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Destinations</p>
                          <p className="text-gray-600">
                            {trip.locations.length} location{trip.locations.length !== 1 ? 's' : ''} planned
                          </p>
                          {trip.locations.length > 0 && (
                            <p className="text-sm text-green-600 font-medium">Ready to explore!</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map Preview */}
                  <div className="relative">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                      <div className="h-80 relative">
                        {trip.locations.length > 0 ? (
                          <Map itineraries={trip.locations} />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gray-50">
                            <div className="text-center">
                              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                              <p className="text-gray-500 font-medium">No locations added yet</p>
                              <p className="text-sm text-gray-400">Add your first location to see it on the map</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {trip.description && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">About This Trip</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {trip.description}
                    </p>
                  </div>
                )}

                {/* Empty State for Locations */}
                {trip.locations.length === 0 && (
                  <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="max-w-md mx-auto">
                      <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Planning Your Adventure</h3>
                      <p className="text-gray-600 mb-6">Add locations to create your perfect itinerary</p>
                      <Link href={`/trips/${trip.id}/location/new`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105">
                          <Plus className="mr-2 h-5 w-5" />
                          Add Your First Location
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-6 mt-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-900">Your Locations</h2>
                  <Link href={`/trips/${trip.id}/location/new`}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105">
                      <Plus className="mr-2 h-5 w-5" />
                      Add Location
                    </Button>
                  </Link>
                </div>

                {trip.locations.length === 0 ? (
                  <div className="text-center py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="max-w-md mx-auto">
                      <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <MapPin className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Locations Yet</h3>
                      <p className="text-gray-600 mb-8">Create your perfect itinerary by adding locations you want to visit</p>
                      <Link href={`/trips/${trip.id}/location/new`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105">
                          <Plus className="mr-2 h-5 w-5" />
                          Add Your First Location
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <SortableItinerary locations={trip.locations} tripId={trip.id} />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="map" className="space-y-6 mt-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-900">Trip Map</h2>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                  <div className="h-96 relative">
                    {trip.locations.length > 0 ? (
                      <Map itineraries={trip.locations} />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-50">
                        <div className="text-center max-w-md">
                          <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <MapPin className="h-10 w-10 text-blue-600" />
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Map Coming Soon</h3>
                          <p className="text-gray-600 mb-8">Add locations to see them plotted on your interactive map</p>
                          <Link href={`/trips/${trip.id}/location/new`}>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105">
                              <Plus className="mr-2 h-5 w-5" />
                              Add Location
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href="/trips">
            <Button variant="outline" className="bg-white/80 hover:bg-white border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Trips
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}