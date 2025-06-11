"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This runs only on the client
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <body>
        <Toaster />
        {mounted ? (
          <div className="flex min-h-screen">
            {isAuthenticated && <Sidebar />}
            <main className="flex-1">{children}</main>
          </div>
        ) : null}
      </body>
    </html>
  );
}
