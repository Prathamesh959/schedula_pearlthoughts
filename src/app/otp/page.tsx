'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { MOCK_OTP } from '@/lib/constants';
import { NumericKeypad } from '@/components/numeric-keypad';

export default function OTPPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (otp.length < 4) {
        setOtp((prev) => prev + key);
        setError('');
      }
    },
    [otp]
  );

  const handleDelete = useCallback(() => {
    setOtp((prev) => prev.slice(0, -1));
    setError('');
  }, []);

  // Desktop: handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, handleDelete]);

  const handleVerify = () => {
    if (otp.length !== 4) {
      setError('Please enter the 4-digit code.');
      return;
    }

    if (otp === MOCK_OTP) {
      router.push('/dashboard');
    } else {
      setError('Invalid OTP. Try 1234.');
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp('');
    setError('');
  };

  const digits = otp.split('').concat(Array(4).fill('')).slice(0, 4);

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-white md:bg-gray-50/50 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white md:rounded-2xl md:shadow-xl md:border md:border-gray-100 px-6 pt-8 pb-8 md:p-10 md:my-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">OTP Code Verification</h1>
        </div>

        {/* Description */}
        <p className="text-sm lg:text-base text-gray-500 text-center mb-8">
          Code has been sent to +91 10 ****99
        </p>

        {/* OTP Display Boxes */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
          {digits.map((digit, index) => (
            <div
              key={index}
              className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl text-xl md:text-2xl font-bold border-2 transition-all ${
                digit
                  ? 'border-[#00BCD4] bg-[#00BCD4]/5 text-gray-900'
                  : index === otp.length
                    ? 'border-[#00BCD4] bg-white'
                    : 'border-gray-200 bg-gray-50'
              }`}
            >
              {digit}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Desktop hint */}
        <p className="hidden md:block text-xs text-gray-400 text-center mb-4">
          Type the code using your keyboard
        </p>

        {/* Resend Timer */}
        <div className="text-center mb-8">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-sm text-[#00BCD4] font-medium hover:underline"
            >
              Resend code
            </button>
          ) : (
            <p className="text-sm text-gray-400">
              Resend code in{' '}
              <span className="text-[#00BCD4] font-semibold">00:{timer.toString().padStart(2, '0')} s</span>
            </p>
          )}
        </div>

        {/* Numeric Keypad — mobile only */}
        <div className="mb-6 md:hidden">
          <NumericKeypad onPress={handleKeyPress} onDelete={handleDelete} />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full lg:w-auto lg:px-16 lg:mx-auto lg:flex py-3.5 bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-[#00BCD4]/25 flex items-center justify-center"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
