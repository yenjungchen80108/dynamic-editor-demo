/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: {
      ssr: true,
      minify: true,
    },
  },
  env: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_REGION: process.env.AWS_REGION,
    NEXT_PUBLIC_AWS_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
  },
};

export default nextConfig;
