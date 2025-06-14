'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, BarChart2, ClipboardList, LogOut } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/home', icon: <Home className="mr-2" size={20} /> },
    { name: 'Upload', path: '/document', icon: <FileText className="mr-2" size={20} /> },
    { name: 'Procedure Results', path: '/procedure-results', icon: <ClipboardList className="mr-2" size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 className="mr-2" size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };


  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="p-6">
          <h1 className="text-4xl font-mediu text-[var(--color-primary-dark)]">incision</h1>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center px-6 py-4 transition-colors rounded-r-full font-medium ${isActive
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button at bottom */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
        >
          <LogOut className="mr-2" size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
