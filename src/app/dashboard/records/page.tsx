'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { FileText } from 'lucide-react';

export default function RecordsPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Medical Records</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">Your health records in one place</p>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20 px-5">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#E0F7FA] flex items-center justify-center mb-4">
          <FileText className="w-10 h-10 md:w-12 md:h-12 text-[#00BCD4]" />
        </div>
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-2">No Records Yet</h2>
        <p className="text-sm md:text-base text-gray-400 text-center max-w-sm">
          Your medical records, prescriptions, and reports will appear here.
        </p>
      </div>
    </DashboardLayout>
  );
}
