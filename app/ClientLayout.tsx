// app/ClientLayout.tsx

'use client';

import { SessionProvider } from "next-auth/react";
import NavBar from "./components/NavBar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <NavBar />
      <main className="container mx-auto mt-4">
        {children}
      </main>
    </SessionProvider>
  );
}
