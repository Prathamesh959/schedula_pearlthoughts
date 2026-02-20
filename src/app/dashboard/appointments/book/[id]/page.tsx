'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
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
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <p className="text-gray-500">Doctor not found</p>
        </div>
      </ProtectedRoute>
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
    <ProtectedRoute>
      <div className="min-h-screen bg-white pb-8">
        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="px-5 mb-5">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
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
              <h3 className="font-semibold text-gray-900 text-sm">{doctor.name}</h3>
              <p className="text-xs text-gray-500">{doctor.specialization} - {doctor.experience}</p>
              <p className="text-xs text-gray-400">{doctor.education}</p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="px-5 mb-5">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-2xl border border-gray-100 p-3 w-full"
            classNames={{
              day_selected: 'bg-[#00BCD4] text-white hover:bg-[#00ACC1]',
              day_today: 'bg-[#E0F7FA] text-[#00BCD4] font-bold',
            }}
          />
        </div>

        {/* Select slot heading */}
        <div className="px-5 mb-4">
          <h3 className="text-sm font-bold text-gray-900">Select slot</h3>
        </div>

        {/* Morning Slots */}
        <div className="px-5 mb-5">
          <TimeSlotPicker
            slots={MORNING_SLOTS}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
            label="Morning Slot"
          />
        </div>

        {/* Evening Slots */}
        <div className="px-5 mb-8">
          <TimeSlotPicker
            slots={EVENING_SLOTS}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
            label="Evening Slot"
          />
        </div>

        {/* Book Button */}
        <div className="px-5">
          <button
            onClick={handleBookAppointment}
            disabled={!selectedDate || !selectedSlot}
            className="w-full py-3.5 bg-[#00BCD4] hover:bg-[#00ACC1] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-[#00BCD4]/25 disabled:shadow-none"
          >
            Book appointment
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
