import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains:['avatars.githubusercontent.com', 'lh3.googleusercontent.com',],
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '**.ufs.sh', 
        pathname: '/**',  
      },
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
