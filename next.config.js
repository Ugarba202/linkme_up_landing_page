/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Placeholder for new storage
      },
    ],
  },
};

module.exports = nextConfig;
