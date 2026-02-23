'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { DashboardLayout } from '@/components/dashboard-layout';
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
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#00BCD4] to-[#00838F] flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-md lg:hidden">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-400">Welcome back</p>
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900">
                Hello, <span className="text-[#00BCD4]">{user?.name?.split(' ')[0] || 'User'}</span> 👋
              </h1>
            </div>
          </div>
          <button className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center relative hover:bg-gray-50 transition-colors lg:hidden">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>

        {/* Search */}
        <div className="max-w-xl">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      {/* Doctor List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">Available Doctors</h2>
          <button className="text-xs md:text-sm text-[#00BCD4] font-medium hover:underline">
            See All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-sm">No doctors found matching &quot;{search}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
