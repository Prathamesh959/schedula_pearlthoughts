import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { AppointmentProvider } from '@/context/appointment-context';

export const metadata: Metadata = {
  title: 'Schedula - Healthcare Appointment Scheduling',
  description:
    'Book appointments with trusted healthcare professionals. Easy scheduling, instant confirmation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <AuthProvider>
          <AppointmentProvider>
            <div className="max-w-md mx-auto min-h-screen bg-white relative shadow-xl">
              {children}
            </div>
          </AppointmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
