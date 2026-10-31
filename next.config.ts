import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Emit `route/index.html` instead of `route.html` so plain static file
  // servers (e.g. `python -m http.server`) serve the page on refresh
  // instead of falling back to a directory listing.
  trailingSlash: true,
};

export default nextConfig;
