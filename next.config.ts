import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"], // ✅ السماح بالصور من Cloudinary
  },
};

export default nextConfig;
