'use client';

import React, { useEffect } from "react";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { useSearchParams } from 'next/navigation';

import "../styles/globals.css";
import RootLayout from "../components/layout";
import type { AppProps } from "next/app";
import BottomNavBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <AppContent Component={Component} pageProps={pageProps} />
    </ClerkProvider>
  );
}

function AppContent({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) {
  const { user } = useUser(); 
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');

  useEffect(() => {
    if (redirectUrl && user?.id) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl, user?.id]);

  return (
    <>
      <Head>
      <title>Welcome to FrameRate - Your Ultimate Cinema Companion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://better-letterboxd.vercel.app/"
        />
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
      </Head>

      <RootLayout>
        <Component {...pageProps} />
        <BottomNavBar />
        <Footer />
      </RootLayout>
    </>
  );
}

export default MyApp;
