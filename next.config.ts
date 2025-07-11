import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains:['avatars.githubusercontent.com'],
    remotePatterns:[
      {
        hostname:'images.unsplash.com'
      }
    ]
  },
  eslint:{
    ignoreDuringBuilds:true,
  },
  typescript:{
    ignoreBuildErrors:true,
  }
};

export default nextConfig;
