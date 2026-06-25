const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
