import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

import "../styles/globals.css";
import RootLayout from "../components/layout"; // Use the correct name of your layout component
import type { AppProps } from "next/app";
import BottomNavBar from "@/components/BottomNav";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Welcome to FrameRate - Your Ultimate Cinema Companion</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://better-letterboxd.vercel.app/" />
      <meta
        property="og:title"
        content="At FrameRate, every review counts. Share your perspective, rate movies, and contribute to a community-driven rating system that values authenticity and diversity of opinion."
      />
      <meta
        property="og:description"
        content="At FrameRate, every review counts. Share your perspective, rate movies, and contribute to a community-driven rating system that values authenticity and diversity of opinion."
      />
      <meta property="og:image" content="/1.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://better-letterboxd.vercel.app/"
      />
      <meta
        property="twitter:title"
        content="Welcome to FrameRate - Your Ultimate Cinema Companion"
      />
      <meta
        property="twitter:description"
        content="At FrameRate, every review counts. Share your perspective, rate movies, and contribute to a community-driven rating system that values authenticity and diversity of opinion."
      />
      <meta property="twitter:image" content="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />

      <ClerkProvider {...pageProps} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <RootLayout>
          <Component {...pageProps} />
          <BottomNavBar />
        <Footer />
        </RootLayout>
      </ClerkProvider>
    </>
  );
}

export default MyApp;
