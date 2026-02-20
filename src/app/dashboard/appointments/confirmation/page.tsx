'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { useAppointments } from '@/context/appointment-context';
import { CheckCircle, CalendarDays } from 'lucide-react';
import { formatDate } from '@/lib/utils';

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('id');
  const { appointments } = useAppointments();

  const appointment = appointments.find((a) => a.id === appointmentId);

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Appointment not found</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-[#00BCD4] font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-5 pt-8 pb-8 flex flex-col">
      {/* Success Icon */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle className="w-9 h-9 text-emerald-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Appointment Scheduled</h1>
      </div>

      {/* Doctor Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
        <div className="flex gap-4 items-center">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#E0F7FA] flex-shrink-0">
            <Image
              src={appointment.doctorImage}
              alt={appointment.doctorName}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base">{appointment.doctorName}</h2>
            <p className="text-xs text-gray-500">{appointment.doctorSpecialization}</p>
            <p className="text-xs text-gray-400 mt-0.5">{appointment.doctorEducation}</p>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="space-y-4 mb-6">
        {/* Appointment Number */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
          <span className="text-xs text-gray-500">Appointment Number</span>
          <span className="text-sm font-bold text-gray-900">{appointment.appointmentNumber}</span>
        </div>

        {/* Status & Date */}
        <div className="flex gap-3">
          <div className="flex-1 bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span
              className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold capitalize"
            >
              {appointment.status}
            </span>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Reporting Time</p>
            <p className="text-xs font-bold text-gray-900">
              {formatDate(new Date(appointment.date))}
            </p>
            <p className="text-xs text-gray-500">{appointment.time}</p>
          </div>
        </div>
      </div>

      {/* Add to Calendar */}
      <button className="w-full py-3 bg-[#E0F7FA] text-[#00BCD4] font-medium rounded-xl flex items-center justify-center gap-2 mb-4 hover:bg-[#B2EBF2] transition-all">
        <CalendarDays className="w-4 h-4" />
        Add to calendar
      </button>

      {/* Add Patient Details */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Add Patient Details</h3>
        <button className="w-full py-3 border-2 border-dashed border-[#00BCD4] text-[#00BCD4] font-medium rounded-xl hover:bg-[#E0F7FA] transition-all text-sm">
          + Add Patient Details
        </button>
      </div>

      {/* View My Appointment Button */}
      <button
        onClick={() => router.push('/dashboard/appointments')}
        className="w-full py-3.5 bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-[#00BCD4]/25 mt-auto"
      >
        View My Appointment
      </button>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-[#00BCD4] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <ConfirmationContent />
      </Suspense>
    </ProtectedRoute>
  );
}
