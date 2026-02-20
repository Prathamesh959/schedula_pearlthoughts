'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NumericKeypadProps {
  onPress: (key: string) => void;
  onDelete: () => void;
}

export function NumericKeypad({ onPress, onDelete }: NumericKeypadProps) {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '⌫'],
  ];

  return (
    <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
      {keys.flat().map((key) => (
        <button
          key={key}
          onClick={() => {
            if (key === '⌫') {
              onDelete();
            } else if (key !== '*') {
              onPress(key);
            }
          }}
          className={cn(
            'h-14 rounded-xl text-lg font-semibold transition-all',
            key === '*'
              ? 'text-gray-400 cursor-default'
              : key === '⌫'
                ? 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'
          )}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
