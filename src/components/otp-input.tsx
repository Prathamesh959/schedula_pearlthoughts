'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  value: string;
  length?: number;
  onChange: (value: string) => void;
}

export function OTPInput({ value, length = 4, onChange }: OTPInputProps) {
  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      onChange(value.slice(0, -1));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChar = e.target.value.replace(/\D/g, '').slice(-1);
    if (newChar && value.length < length) {
      onChange(value + newChar);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {digits.map((digit, index) => (
        <div
          key={index}
          className={cn(
            'w-14 h-14 flex items-center justify-center rounded-xl text-xl font-bold border-2 transition-all',
            digit
              ? 'border-[#00BCD4] bg-[#00BCD4]/5 text-gray-900'
              : index === value.length
                ? 'border-[#00BCD4] bg-white'
                : 'border-gray-200 bg-gray-50'
          )}
        >
          {digit || ''}
        </div>
      ))}
      {/* Hidden input to capture keyboard events */}
      <input
        type="tel"
        value=""
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 w-0 h-0"
        maxLength={1}
        autoFocus
      />
    </div>
  );
}
