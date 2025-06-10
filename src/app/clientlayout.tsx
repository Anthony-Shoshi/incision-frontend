'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check for authToken in localStorage (client-side only)
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  if (isLoginPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen">
      {isAuthenticated && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}