import "./globals.css";
import { neueMontreal  } from "@/lib/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={neueMontreal.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
