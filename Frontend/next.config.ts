import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Lệnh quan trọng nhất
  },
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua lỗi bắt bẻ cú pháp
  },
};

export default nextConfig;