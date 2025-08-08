// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from '@/store/provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema CoolTech",
  description: "Plataforma de ventas y administración de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base text-base flex flex-col min-h-screen`}
      >
        <Providers>
          <main className="flex-1 w-full max-w-[1440px] mx-auto px-[clamp(16px,4vw,40px)]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

