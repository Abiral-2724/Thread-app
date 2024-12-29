/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Uncomment if you are using server actions, otherwise remove it
    // serverActions: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
    
  },
  env: {
    // Expose the MongoDB URI as an environment variable for server-side usage
    MONGODB_URI: process.env.MONGODB_URI || "",
  },
};

module.exports = nextConfig;
