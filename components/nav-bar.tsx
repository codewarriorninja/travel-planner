"use client";

import { logout } from "@/lib/auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {

  const {data:session} = useSession()
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/20 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 hidden xs:block">
              Travel Planner
            </span>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 xs:hidden">
              Travel
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {session ? (
              <>
                {/* My Trips Link */}
                <Link
                  href="/trips"
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="hidden sm:block">My Trips</span>
                  <span className="sm:hidden text-xs">Trips</span>
                </Link>

                {/* User Profile */}
                <div className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                  <div className="relative">
                    <Image
                      src={session.user?.image || "/default-avatar.png"}
                      alt="Profile"
                      width={28}
                      height={28}
                      className="sm:w-8 sm:h-8 rounded-full ring-2 ring-white shadow-sm"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-gray-700 font-medium text-xs sm:text-sm hidden sm:block">
                    {session.user?.name?.split(" ")[0] || "User"}
                  </span>
                </div>

                {/* Sign Out Button */}
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 font-medium cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="hidden sm:block">Sign Out</span>
                  </button>
                </form>
              </>
            ) : (
              /* Sign In Button */
              <Link
                href="/sign-in"
                className="group relative overflow-hidden px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-1 sm:space-x-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">Sign In</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}