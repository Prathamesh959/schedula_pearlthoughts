'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { BottomNav } from '@/components/bottom-nav';
import { SearchBar } from '@/components/search-bar';
import { DoctorCard } from '@/components/doctor-card';
import { mockDoctors } from '@/lib/mock-doctors';
import { SPECIALIZATIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DoctorsListingPage() {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const router = useRouter();

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesSpec =
      selectedSpec === 'All' || doctor.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white pb-20">
        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Find Doctors</h1>
          </div>

          <SearchBar value={search} onChange={setSearch} />

          {/* Specialization Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {SPECIALIZATIONS.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpec(spec)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-all',
                  selectedSpec === spec
                    ? 'bg-[#00BCD4] text-white border-[#00BCD4] shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#00BCD4]'
                )}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div className="px-5 mt-3">
          <p className="text-xs text-gray-400 mb-3">{filteredDoctors.length} doctors found</p>
          <div className="flex flex-col gap-3">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No doctors found</p>
              </div>
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
