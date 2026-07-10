import type { NextConfig } from "next";

const PATH = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${PATH}/:path*`
            },
            {
                source: "/",
                destination: "/home"
            }
        ]
    }
};

export default nextConfig;
