import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stitch maketinin nümunə şəkilləri; real butik fotoları gələndə public/-ə köçür.
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/aida-public/**" }],
  },
};

export default nextConfig;
