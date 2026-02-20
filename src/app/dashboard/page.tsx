'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { ProtectedRoute } from '@/components/protected-route';
import { BottomNav } from '@/components/bottom-nav';
import { SearchBar } from '@/components/search-bar';
import { DoctorCard } from '@/components/doctor-card';
import { mockDoctors } from '@/lib/mock-doctors';
import { Bell } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const filteredDoctors = mockDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white pb-20">
        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00BCD4] to-[#00838F] flex items-center justify-center text-white font-bold text-sm shadow-md">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-xs text-gray-400">Welcome back</p>
                <h1 className="text-lg font-bold text-gray-900">
                  Hello, <span className="text-[#00BCD4]">{user?.name?.split(' ')[0] || 'User'}</span> 👋
                </h1>
              </div>
            </div>
            <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center relative hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>

          {/* Search */}
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Doctor List */}
        <div className="px-5 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Available Doctors</h2>
            <button className="text-xs text-[#00BCD4] font-medium hover:underline">
              See All
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No doctors found matching &quot;{search}&quot;</p>
              </div>
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
