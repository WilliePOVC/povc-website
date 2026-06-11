import type { NextConfig } from "next";

const isPagesExport = process.env.PAGES === "true";
const BASE_PATH = isPagesExport ? "/povc-website" : "";

const nextConfig: NextConfig = {
  output: "export",
  ...(isPagesExport && {
    basePath: BASE_PATH,
    assetPrefix: BASE_PATH,
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fundone.presson.vc",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
    ],
  },
};

export default nextConfig;
