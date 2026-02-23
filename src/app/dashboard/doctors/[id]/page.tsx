'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { mockDoctors } from '@/lib/mock-doctors';
import { ArrowLeft, Heart, Star, Users, Clock, Award } from 'lucide-react';

export default function DoctorDetailPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id as string;
  const doctor = mockDoctors.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Doctor not found</p>
            <button onClick={() => router.back()} className="text-[#00BCD4] font-medium">
              Go Back
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Book Appointment</h1>
          </div>
          <button className="w-9 h-9 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Heart className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Doctor Profile Card */}
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
          <div className="flex gap-4 md:gap-6">
            <div className="relative w-24 h-28 md:w-32 md:h-36 rounded-xl overflow-hidden bg-[#E0F7FA] flex-shrink-0">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{doctor.name}</h2>
              <p className="text-sm md:text-base text-gray-500 mt-0.5">{doctor.specialization}</p>
              <p className="text-xs md:text-sm text-gray-400 mt-0.5">{doctor.education}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 md:gap-4 mt-5">
            <div className="flex-1 flex items-center gap-2 bg-[#E0F7FA]/50 rounded-xl p-3 md:p-4">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-[#00BCD4]" />
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-800">{doctor.patients}</p>
                <p className="text-[10px] md:text-xs text-gray-400">Patients</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-[#E0F7FA]/50 rounded-xl p-3 md:p-4">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-[#00BCD4]" />
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-800">{doctor.experience}</p>
                <p className="text-[10px] md:text-xs text-gray-400">Experience</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-[#E0F7FA]/50 rounded-xl p-3 md:p-4">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400" />
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-800">{doctor.rating}</p>
                <p className="text-[10px] md:text-xs text-gray-400">{doctor.reviews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="mt-6 md:mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm md:text-base font-bold text-gray-900">About Doctor</h3>
            <button className="text-xs md:text-sm text-[#00BCD4] font-medium">...more</button>
          </div>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{doctor.about}</p>
        </div>

        {/* Service & Specialization */}
        <div className="mt-6 md:mt-8">
          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3">Service & Specialization</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-[#E0F7FA] text-[#00838F] rounded-lg text-xs md:text-sm font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mt-6 md:mt-8">
          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3">Availability For Consulting</h3>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <Clock className="w-4 h-4 text-[#00BCD4]" />
            <span>{doctor.availableDays}</span>
            <span className="text-gray-300">|</span>
            <span>{doctor.availability}</span>
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="mt-8 md:mt-10">
          <button
            onClick={() => router.push(`/dashboard/appointments/book/${doctor.id}`)}
            className="w-full md:w-auto md:px-16 py-3.5 bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-[#00BCD4]/25"
          >
            Book appointment
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
