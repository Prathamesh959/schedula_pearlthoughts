'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search Doctors' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 placeholder-gray-400 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30 focus:border-[#00BCD4] transition-all"
      />
    </div>
  );
}
