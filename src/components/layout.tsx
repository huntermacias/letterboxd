import React from 'react';
import BottomNavBar from './BottomNav';
import Footer from './Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <BottomNavBar />
      <Footer />

  
    </div> // Just return a div or fragment wrapping children
  );
}
