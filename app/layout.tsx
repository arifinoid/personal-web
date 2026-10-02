import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";

import { siteUrl } from "@/lib/site";
import { AppShell } from "@/components/shell/app-shell";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Rohmad Arifin — Fullstack Software Engineer",
  description:
    "Rohmad Arifin (arifinoid) — fullstack software engineer with 7+ years building scalable systems, developer tools, and cross-platform solutions.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "64x64 32x24 16", type: "image/x-icon" },
      { url: "/logo192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/logo192.png" }],
  },
  openGraph: {
    title: "Rohmad Arifin — Fullstack Software Engineer",
    description:
      "Fullstack software engineer with 7+ years building scalable systems, developer tools, and cross-platform solutions.",
    type: "website",
    url: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0e18",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="moon" className="antialiased" suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint to avoid a light/dark flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="moon"||t==="day")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${plexMono.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
