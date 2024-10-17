/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "static2.finnhub.io",
        protocol: "https",
      },
      {
        hostname: "finnhub.io",
        protocol: "https",
      },
      {
        hostname: "flagcdn.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
