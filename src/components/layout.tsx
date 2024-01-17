import React from "react";
import BottomNavBar from "./BottomNav";
import Footer from "./Footer";
// import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <div>
        {children}
        <BottomNavBar />
        <Footer />
      </div>
    // </ClerkProvider>
  );
}
