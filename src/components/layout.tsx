import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>{children}</div> // Just return a div or fragment wrapping children
  );
}
