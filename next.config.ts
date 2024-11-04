import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
},
eslint: {
    ignoreDuringBuilds: true,
},
transpilePackages: ['lucide-react'] 
  /* config options here */
};

export default nextConfig;
