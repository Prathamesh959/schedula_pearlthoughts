'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { TimeSlotPicker } from '@/components/time-slot-picker';
import { useAuth } from '@/context/auth-context';
import { useAppointments } from '@/context/appointment-context';
import { mockDoctors } from '@/lib/mock-doctors';
import { MORNING_SLOTS, EVENING_SLOTS } from '@/lib/constants';
import { generateAppointmentId } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

export default function BookAppointmentPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id as string;
  const doctor = mockDoctors.find((d) => d.id === doctorId);
  const { user } = useAuth();
  const { bookAppointment } = useAppointments();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!doctor) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">Doctor not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const selectedSlotData =
    [...MORNING_SLOTS, ...EVENING_SLOTS].find((s) => s.id === selectedSlot);

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedSlot || !selectedSlotData || !user) return;

    const appointment = {
      id: `appt_${Date.now()}`,
      appointmentNumber: generateAppointmentId(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      doctorImage: doctor.image,
      doctorEducation: doctor.education,
      date: selectedDate.toISOString(),
      time: selectedSlotData.time,
      status: 'active' as const,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };

    bookAppointment(appointment);
    router.push(`/dashboard/appointments/confirmation?id=${appointment.id}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Book Appointment</h1>
        </div>

        {/* Doctor Info */}
        <div className="flex items-center gap-3 bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm mb-6">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#E0F7FA] flex-shrink-0">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">{doctor.name}</h3>
            <p className="text-xs md:text-sm text-gray-500">{doctor.specialization} - {doctor.experience}</p>
            <p className="text-xs text-gray-400">{doctor.education}</p>
          </div>
        </div>

        {/* Calendar + Slots — side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Calendar */}
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-2xl border border-gray-100 p-3 w-full bg-white"
              classNames={{
                day_selected: 'bg-[#00BCD4] text-white hover:bg-[#00ACC1]',
                day_today: 'bg-[#E0F7FA] text-[#00BCD4] font-bold',
              }}
            />
          </div>

          {/* Time Slots */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm md:text-base font-bold text-gray-900 mb-4">Select slot</h3>
              <TimeSlotPicker
                slots={MORNING_SLOTS}
                selectedSlot={selectedSlot}
                onSelect={setSelectedSlot}
                label="Morning Slot"
              />
            </div>
            <TimeSlotPicker
              slots={EVENING_SLOTS}
              selectedSlot={selectedSlot}
              onSelect={setSelectedSlot}
              label="Evening Slot"
            />
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBookAppointment}
          disabled={!selectedDate || !selectedSlot}
          className="w-full md:w-auto md:px-16 py-3.5 bg-[#00BCD4] hover:bg-[#00ACC1] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-[#00BCD4]/25 disabled:shadow-none"
        >
          Book appointment
        </button>
      </div>
    </DashboardLayout>
  );
}
