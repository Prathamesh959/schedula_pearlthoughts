'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { LogOut, ChevronRight, User, Bell, Shield, HelpCircle, FileText } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    { icon: User, label: 'Edit Profile', desc: 'Update your personal info' },
    { icon: Bell, label: 'Notifications', desc: 'Manage your notifications' },
    { icon: Shield, label: 'Privacy & Security', desc: 'Protect your account' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'Get help when you need it' },
    { icon: FileText, label: 'Terms & Conditions', desc: 'Read our terms' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Profile</h1>

          {/* Profile Card */}
          <div className="flex items-center gap-4 md:gap-6 bg-gradient-to-r from-[#00BCD4] to-[#00838F] rounded-2xl p-5 md:p-8 text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl md:text-3xl font-bold border-2 border-white/30">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="font-bold text-lg md:text-xl">{user?.name || 'User'}</h2>
              <p className="text-white/80 text-xs md:text-sm">{user?.email || ''}</p>
              <p className="text-white/60 text-xs md:text-sm mt-0.5">{user?.phone || ''}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#E0F7FA] flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#00BCD4]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm md:text-base font-medium text-gray-900">{item.label}</p>
                <p className="text-xs md:text-sm text-gray-400">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>

        {/* Logout — visible on mobile/tablet (sidebar has logout on desktop) */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors mt-4 lg:hidden"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <LogOut className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
          </div>
          <span className="text-sm md:text-base font-medium text-red-500">Logout</span>
        </button>
      </div>
    </DashboardLayout>
  );
}
