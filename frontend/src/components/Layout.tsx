import React from 'react';
import { Sidebar } from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className={`flex-1 overflow-hidden ${isMobile ? 'pt-16' : ''}`}>
        {children}
      </main>
      <Toaster />
    </div>
  );
};