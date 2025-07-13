"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Globe as GlobeIcon, Target, Plane, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/trips");
        const data = await response.json();
        setLocations(data);
        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );

        setVisitedCountries(countries);
      } catch (err) {
        console.error("error", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.3;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <GlobeIcon className="h-8 w-8 text-white animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Your Travel Journey
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Explore the world through your adventures. Every pin tells a story, every country holds memories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Globe Section */}
            <div className="lg:col-span-2">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-white/20">
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <Target className="h-6 w-6 text-blue-300" />
                    Interactive World Map
                  </CardTitle>
                  <p className="text-blue-100 text-sm">
                    {isLoading ? 'Loading your adventures...' : `Discover ${locations.length} locations across ${visitedCountries.size} countries`}
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[600px] w-full relative bg-gradient-to-b from-blue-950/50 to-indigo-950/50">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent opacity-20"></div>
                        </div>
                        <p className="text-blue-200 mt-4 text-lg font-medium">Loading your world...</p>
                      </div>
                    ) : (
                      <Globe
                        ref={globeRef}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        backgroundColor="rgba(0,0,0,0)"
                        pointColor={() => "#60A5FA"}
                        pointLabel={(point: any) => `
                          <div style="
                            background: rgba(0,0,0,0.8);
                            padding: 8px 12px;
                            border-radius: 8px;
                            color: white;
                            font-size: 14px;
                            font-weight: 500;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                            border: 1px solid rgba(96,165,250,0.5);
                          ">
                            <div style="display: flex; align-items: center; gap: 6px;">
                              <span style="color: #60A5FA;">📍</span>
                              <span>${point.name}</span>
                            </div>
                            <div style="color: #93C5FD; font-size: 12px; margin-top: 2px;">
                              ${point.country}
                            </div>
                          </div>
                        `}
                        pointsData={locations}
                        pointRadius={0.8}
                        pointAltitude={0.15}
                        pointsMerge={true}
                        width={800}
                        height={600}
                        atmosphereColor="#60A5FA"
                        atmosphereAltitude={0.25}
                        enablePointerInteraction={true}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats and Countries Section */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/20 rounded-full p-3">
                        <GlobeIcon className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {isLoading ? '...' : visitedCountries.size}
                        </p>
                        <p className="text-blue-100 text-sm">Countries Explored</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-500/20 rounded-full p-3">
                        <MapPin className="h-6 w-6 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {isLoading ? '...' : locations.length}
                        </p>
                        <p className="text-purple-100 text-sm">Places Visited</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Countries List */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl sticky top-8">
                <CardHeader className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-b border-white/20">
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                    <Plane className="h-5 w-5 text-indigo-300" />
                    Travel Destinations
                  </CardTitle>
                  <p className="text-indigo-100 text-sm">
                    Your global footprint
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {visitedCountries.size === 0 ? (
                        <div className="text-center py-8">
                          <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <MapPin className="h-8 w-8 text-blue-300" />
                          </div>
                          <p className="text-blue-100 font-medium">No trips yet</p>
                          <p className="text-blue-200/70 text-sm mt-1">Start planning your first adventure!</p>
                        </div>
                      ) : (
                        <>
                          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-4 rounded-lg border border-blue-400/30">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-500/30 rounded-full p-2">
                                <Calendar className="h-4 w-4 text-blue-300" />
                              </div>
                              <div>
                                <p className="text-white font-semibold">
                                  {visitedCountries.size} Countries Conquered
                                </p>
                                <p className="text-blue-200 text-sm">
                                  Keep exploring the world! 🌍
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {Array.from(visitedCountries)
                              .sort()
                              .map((country, key) => (
                                <div
                                  key={key}
                                  className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20 cursor-pointer"
                                >
                                  <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full p-2 group-hover:from-red-500/30 group-hover:to-pink-500/30 transition-all duration-200">
                                    <MapPin className="h-4 w-4 text-red-300" />
                                  </div>
                                  <span className="font-medium text-white group-hover:text-blue-100 transition-colors duration-200">
                                    {country}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.7);
        }
      `}</style>
    </div>
  );
}