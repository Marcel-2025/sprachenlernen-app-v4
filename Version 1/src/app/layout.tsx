import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lingua MVP",
  description: "Sprachenlernen Web App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
