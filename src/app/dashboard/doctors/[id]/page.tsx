'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { BottomNav } from '@/components/bottom-nav';
import { mockDoctors } from '@/lib/mock-doctors';
import { ArrowLeft, Heart, Star, Users, Clock, Award } from 'lucide-react';

export default function DoctorDetailPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id as string;
  const doctor = mockDoctors.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Doctor not found</p>
            <button onClick={() => router.back()} className="text-[#00BCD4] font-medium">
              Go Back
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white pb-24">
        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>
            </div>
            <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Heart className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Doctor Profile Card */}
        <div className="px-5">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex gap-4">
              <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-[#E0F7FA] flex-shrink-0">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">{doctor.name}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{doctor.specialization}</p>
                <p className="text-xs text-gray-400 mt-0.5">{doctor.education}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex-1 flex items-center gap-2 bg-[#E0F7FA]/50 rounded-xl p-3">
                <Users className="w-4 h-4 text-[#00BCD4]" />
                <div>
                  <p className="text-xs font-bold text-gray-800">{doctor.patients}</p>
                  <p className="text-[10px] text-gray-400">Patients</p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-2 bg-[#E0F7FA]/50 rounded-xl p-3">
                <Award className="w-4 h-4 text-[#00BCD4]" />
                <div>
                  <p className="text-xs font-bold text-gray-800">{doctor.experience}</p>
                  <p className="text-[10px] text-gray-400">Experience</p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-2 bg-[#E0F7FA]/50 rounded-xl p-3">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <div>
                  <p className="text-xs font-bold text-gray-800">{doctor.rating}</p>
                  <p className="text-[10px] text-gray-400">{doctor.reviews}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="px-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">About Doctor</h3>
            <button className="text-xs text-[#00BCD4] font-medium">...more</button>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{doctor.about}</p>
        </div>

        {/* Service & Specialization */}
        <div className="px-5 mt-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Service & Specialization</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1.5 bg-[#E0F7FA] text-[#00838F] rounded-lg text-xs font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="px-5 mt-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Availability For Consulting</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-4 h-4 text-[#00BCD4]" />
            <span>{doctor.availableDays}</span>
            <span className="text-gray-300">|</span>
            <span>{doctor.availability}</span>
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="px-5 mt-8">
          <button
            onClick={() => router.push(`/dashboard/appointments/book/${doctor.id}`)}
            className="w-full py-3.5 bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-[#00BCD4]/25"
          >
            Book appointment
          </button>
        </div>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
