import localFont from "next/font/local";

export const neueMontreal = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../../public/fonts/neue-montreal/NeueMontreal-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/neue-montreal/NeueMontreal-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/neue-montreal/NeueMontreal-Bold.woff2", weight: "700", style: "normal" },
  ],
});
