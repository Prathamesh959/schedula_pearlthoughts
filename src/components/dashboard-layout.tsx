'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { BottomNav } from '@/components/bottom-nav';
import { TopNavbar } from '@/components/top-navbar';
import { Sidebar } from '@/components/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50/50">
        {/* Sidebar — desktop only (lg+) */}
        <Sidebar />

        {/* Top Navbar — tablet only (md to lg) */}
        <TopNavbar />

        {/* Main content area */}
        <div className="lg:ml-[260px]">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-8">
            {children}
          </main>
        </div>

        {/* Bottom Nav — mobile only */}
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
