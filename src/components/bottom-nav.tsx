'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Search, CalendarDays, FileText, User } from 'lucide-react';

const navItems = [
  { label: 'Find Doctor', href: '/dashboard', icon: Search },
  { label: 'Appointments', href: '/dashboard/appointments', icon: CalendarDays },
  { label: 'Records', href: '/dashboard/records', icon: FileText },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-2 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
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
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors min-w-[64px]',
                isActive
                  ? 'text-[#00BCD4]'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5px]')} />
              <span className={cn('text-[10px] font-medium', isActive && 'font-semibold')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
