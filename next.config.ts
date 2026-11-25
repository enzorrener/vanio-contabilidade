import type { NextConfig } from "next";

// Site estático (GitHub Pages só serve arquivos). No Pages o site mora em
// /vanio-contabilidade; localmente (npm run dev) fica na raiz.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
