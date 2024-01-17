import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>

        {children}
      </ClerkProvider>
  );
}
