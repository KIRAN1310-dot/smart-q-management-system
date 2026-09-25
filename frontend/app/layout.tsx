import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartQ Queue Management",
  description: "Real-time hospital and bank queue management system"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
