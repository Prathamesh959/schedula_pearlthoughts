'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'admin'>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signup, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const result = signup({ name, email, phone, password, role });
    if (result.success) {
      setSuccess(result.message + ' Redirecting to login...');
      setTimeout(() => router.push('/login'), 1500);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-8 pb-8 bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Create Account</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-600">
            {success}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30 focus:border-[#00BCD4] transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30 focus:border-[#00BCD4] transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30 focus:border-[#00BCD4] transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30 focus:border-[#00BCD4] transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30 focus:border-[#00BCD4] transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">I am a</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                role === 'patient'
                  ? 'border-[#00BCD4] bg-[#00BCD4]/5 text-[#00BCD4]'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                role === 'admin'
                  ? 'border-[#00BCD4] bg-[#00BCD4]/5 text-[#00BCD4]'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-[#00BCD4]/25 mt-2"
        >
          Create Account
        </button>

        {/* Login Link */}
        <div className="text-center mt-2">
          <span className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-[#00BCD4] font-semibold hover:underline">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
