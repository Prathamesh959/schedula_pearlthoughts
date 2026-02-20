'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { BottomNav } from '@/components/bottom-nav';
import { FileText } from 'lucide-react';

export default function RecordsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white pb-20">
        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <h1 className="text-xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-xs text-gray-400 mt-1">Your health records in one place</p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div className="w-20 h-20 rounded-full bg-[#E0F7FA] flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-[#00BCD4]" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">No Records Yet</h2>
          <p className="text-sm text-gray-400 text-center max-w-[250px]">
            Your medical records, prescriptions, and reports will appear here.
          </p>
        </div>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
