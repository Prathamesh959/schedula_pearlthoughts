export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'patient' | 'admin';
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  patients: string;
  image: string;
  availability: string;
  availableDays: string;
  about: string;
  services: string[];
  education: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'evening';
  available: boolean;
}

export interface Appointment {
  id: string;
  appointmentNumber: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorImage: string;
  doctorEducation: string;
  date: string;
  time: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  userId: string;
}
