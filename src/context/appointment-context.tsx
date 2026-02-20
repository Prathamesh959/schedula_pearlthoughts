'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Appointment } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';

interface AppointmentContextType {
  appointments: Appointment[];
  bookAppointment: (appointment: Appointment) => void;
  getAppointments: (userId: string) => Appointment[];
  cancelAppointment: (appointmentId: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
    }
  }, []);

  const saveAppointments = useCallback((appts: Appointment[]) => {
    setAppointments(appts);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appts));
  }, []);

  const bookAppointment = useCallback(
    (appointment: Appointment) => {
      const updated = [...appointments, appointment];
      saveAppointments(updated);
    },
    [appointments, saveAppointments]
  );

  const getAppointments = useCallback(
    (userId: string): Appointment[] => {
      return appointments.filter((a) => a.userId === userId);
    },
    [appointments]
  );

  const cancelAppointment = useCallback(
    (appointmentId: string) => {
      const updated = appointments.map((a) =>
        a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a
      );
      saveAppointments(updated);
    },
    [appointments, saveAppointments]
  );

  return (
    <AppointmentContext.Provider
      value={{ appointments, bookAppointment, getAppointments, cancelAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
}
