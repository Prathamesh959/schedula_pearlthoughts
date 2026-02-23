'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Search, CalendarDays, FileText, User, Bell } from 'lucide-react';

const navItems = [
  { label: 'Find Doctor', href: '/dashboard', icon: Search },
  { label: 'Appointments', href: '/dashboard/appointments', icon: CalendarDays },
  { label: 'Records', href: '/dashboard/records', icon: FileText },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
];

export function TopNavbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="hidden md:flex lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3 items-center justify-between">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00BCD4] to-[#00838F] flex items-center justify-center shadow-md">
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" fill="white" fillOpacity="0.9"/>
            <path d="M15 18H25M20 13V23" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-lg font-bold text-gray-900">Schedula</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard' || pathname.startsWith('/dashboard/doctors')
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'bg-[#E0F7FA] text-[#00BCD4]'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Right: Notification + Avatar */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center relative hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00BCD4] to-[#00838F] flex items-center justify-center text-white font-bold text-sm">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      </div>
    </nav>
  );
}
