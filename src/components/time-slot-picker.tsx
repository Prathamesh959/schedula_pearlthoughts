'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TimeSlot } from '@/lib/types';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelect: (slotId: string) => void;
  label: string;
}

export function TimeSlotPicker({ slots, selectedSlot, onSelect, label }: TimeSlotPickerProps) {
  return (
    <div>
      <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-3">{label}</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => slot.available && onSelect(slot.id)}
            disabled={!slot.available}
            className={cn(
              'px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all border',
              selectedSlot === slot.id
                ? 'bg-[#00BCD4] text-white border-[#00BCD4] shadow-sm'
                : slot.available
                  ? 'bg-white text-gray-600 border-gray-200 hover:border-[#00BCD4] hover:text-[#00BCD4]'
                  : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
            )}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}
