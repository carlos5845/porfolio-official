import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media-lim1-1.cdn.whatsapp.net",
            },
        ],
    },
};

export default nextConfig;
