
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          ProductManager © {new Date().getFullYear()} All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
