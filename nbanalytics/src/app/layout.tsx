"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";
import Auth0ProviderWithNavigate from "@/components/Auth0ProviderWithNavigate";

type Props = {
  children: ReactNode;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
      <Auth0ProviderWithNavigate>{children}</Auth0ProviderWithNavigate>
      </body>
    </html>
  );
}
