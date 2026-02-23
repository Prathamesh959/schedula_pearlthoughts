'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
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
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Find Doctors</h1>
        </div>

        <div className="max-w-xl">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Specialization Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-visible">
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap border transition-all',
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

      {/* Doctors Grid */}
      <div>
        <p className="text-xs md:text-sm text-gray-400 mb-3">{filteredDoctors.length} doctors found</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-sm">No doctors found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
