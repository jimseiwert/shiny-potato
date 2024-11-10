import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
},
eslint: {
    ignoreDuringBuilds: true,
},
transpilePackages: ['lucide-react'] ,
images: {
    domains: ['s.gravatar.com', 'lh3.googleusercontent.com', 'lh5.googleusercontent.com', 'www.facebook.com'],
},
  /* config options here */
};

export default nextConfig;
