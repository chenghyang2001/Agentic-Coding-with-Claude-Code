import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath 讓 Next.js 感知 nginx 的 /v2/ 前綴，確保內部 <Link> 和 API route 都以 /v2 為根
  basePath: "/v2",
};

export default nextConfig;
