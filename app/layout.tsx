import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sundram-portfolio.vercel.app"),
  title: "Sundram Singhal — Backend Developer / SDE-1",
  description:
    "Interactive AI-powered portfolio of Sundram Singhal — Backend Developer / SDE-1 specializing in Java 17/21, Spring Boot 3, Apache Kafka, Redis, and AWS CI/CD automation.",
  keywords: [
    "Sundram Singhal",
    "Backend Developer",
    "SDE-1",
    "Java Backend Developer",
    "Spring Boot 3",
    "Apache Kafka",
    "Redis",
    "Distributed Systems",
    "ZeroMesh-UPI",
    "AWS DevOps",
  ],
  authors: [{ name: "Sundram Singhal" }],
  openGraph: {
    title: "Sundram Singhal — Backend Developer / SDE-1",
    description: "Java Backend Developer | Distributed Systems | Kafka | Redis | AWS CI/CD",
    type: "website",
    images: [
      {
        url: "/sundram.jpg",
        width: 800,
        height: 800,
        alt: "Sundram Singhal — Backend Developer / SDE-1",
      },
    ],
  },
  icons: {
    icon: "/sundram.jpg",
    apple: "/sundram.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080C14] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
