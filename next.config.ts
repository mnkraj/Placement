import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com","res.cloudinary.com"], // Allow Google profile images
  },
};

export default nextConfig;
