/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async rewrites() {
    const backendDest = process.env.NODE_ENV === "production"
      ? "https://escap-in-yoga-finalwebsite.onrender.com/api/:path*"
      : "http://localhost:5000/api/:path*";
    return [
      {
        source: "/api/:path*",
        destination: backendDest,
      },
    ];
  },
};

export default nextConfig;
