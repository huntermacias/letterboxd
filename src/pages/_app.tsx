import React from 'react';
import '../styles/globals.css';
import RootLayout from '../components/layout'; // Use the correct name of your layout component
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
