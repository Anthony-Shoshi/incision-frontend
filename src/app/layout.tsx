import "./globals.css"; // Import global styles here if needed
import { ReactNode } from "react";
import ClientLayout from './clientlayout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}