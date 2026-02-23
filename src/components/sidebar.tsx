'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Search, CalendarDays, FileText, User, LogOut, Bell } from 'lucide-react';

const navItems = [
  { label: 'Find Doctor', href: '/dashboard', icon: Search },
  { label: 'Appointments', href: '/dashboard/appointments', icon: CalendarDays },
  { label: 'Records', href: '/dashboard/records', icon: FileText },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-gray-100 z-50">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BCD4] to-[#00838F] flex items-center justify-center shadow-md">
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" fill="white" fillOpacity="0.9"/>
              <path d="M15 18H25M20 13V23" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">Schedula</span>
        </Link>
      </div>

      {/* User Card */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#00BCD4]/10 to-[#00838F]/5 rounded-2xl p-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00BCD4] to-[#00838F] flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
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
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'bg-[#00BCD4] text-white shadow-lg shadow-[#00BCD4]/25'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5px]')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 pb-6 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
          <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">3</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
