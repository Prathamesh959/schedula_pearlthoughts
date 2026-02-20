'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Doctor } from '@/lib/types';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/doctors/${doctor.id}`)}
      className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-50 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
    >
      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#E0F7FA] flex-shrink-0">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-[15px] truncate">{doctor.name}</h3>
        <p className="text-xs text-[#00BCD4] font-medium mt-0.5">{doctor.specialization}</p>
        <p className="text-xs text-emerald-500 font-medium mt-0.5">Available today</p>
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-gray-700">{doctor.rating}</span>
          <span className="text-xs text-gray-400 ml-1">({doctor.reviews})</span>
        </div>
        <p className="text-[10px] text-gray-400 mt-1">{doctor.availability}</p>
      </div>
    </div>
  );
}
