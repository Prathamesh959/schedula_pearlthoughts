'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { BottomNav } from '@/components/bottom-nav';
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
    <ProtectedRoute>
      <div className="min-h-screen bg-white pb-20">
        {/* Header */}
        <div className="px-5 pt-8 pb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-6">Profile</h1>

          {/* Profile Card */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-[#00BCD4] to-[#00838F] rounded-2xl p-5 text-white">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border-2 border-white/30">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="font-bold text-lg">{user?.name || 'User'}</h2>
              <p className="text-white/80 text-xs">{user?.email || ''}</p>
              <p className="text-white/60 text-xs mt-0.5">{user?.phone || ''}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-5">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E0F7FA] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#00BCD4]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors mt-4"
          >
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-sm font-medium text-red-500">Logout</span>
          </button>
        </div>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
