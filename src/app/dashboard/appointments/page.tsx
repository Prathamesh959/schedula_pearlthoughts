'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import { useAppointments } from '@/context/appointment-context';
import { CalendarDays, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AppointmentsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { appointments } = useAppointments();

  const userAppointments = user
    ? appointments.filter((a) => a.userId === user.id)
    : [];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">{userAppointments.length} appointments</p>
      </div>

      {/* Appointments List */}
      {userAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {userAppointments.map((appointment) => (
            <div
              key={appointment.id}
              onClick={() =>
                router.push(`/dashboard/appointments/confirmation?id=${appointment.id}`)
              }
              className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
            >
              <div className="flex gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#E0F7FA] flex-shrink-0">
                  <Image
                    src={appointment.doctorImage}
                    alt={appointment.doctorName}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">{appointment.doctorSpecialization}</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-semibold capitalize ${
                        appointment.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : appointment.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <CalendarDays className="w-3 h-3" />
                      <span>{formatDate(new Date(appointment.date))}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <CalendarDays className="w-12 h-12 md:w-16 md:h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-sm md:text-base mb-1">No appointments yet</p>
          <p className="text-gray-300 text-xs md:text-sm mb-6">Book your first appointment with a doctor</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2.5 bg-[#00BCD4] text-white text-sm font-medium rounded-xl hover:bg-[#00ACC1] transition-all"
          >
            Find Doctors
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
