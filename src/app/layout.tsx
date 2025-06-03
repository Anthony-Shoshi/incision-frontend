import "./globals.css"; // Import global styles here if needed
import { ReactNode } from "react";
import Sidebar from "../components/Sidebar"; // Adjust path if necessary

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}