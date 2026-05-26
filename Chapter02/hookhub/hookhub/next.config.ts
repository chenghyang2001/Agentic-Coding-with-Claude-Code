import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 修正 Next.js 誤判 workspace root（C:\Users\B00332\ 有 package-lock.json）
  // 若不加這行，PostCSS Tailwind scanner 會掃描錯誤路徑，導致樣式全空白
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
