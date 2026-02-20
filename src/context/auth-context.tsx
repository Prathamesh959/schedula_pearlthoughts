'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { generateUserId } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (userData: Omit<User, 'id' | 'createdAt'>) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUsers = useCallback((): User[] => {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  }, []);

  const login = useCallback(
    (email: string, password: string): { success: boolean; message: string } => {
      const users = getUsers();
      const foundUser = users.find(
        (u: User) => (u.email === email || u.phone === email) && u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(foundUser));
        return { success: true, message: 'Login successful!' };
      }

      return { success: false, message: 'Invalid email/phone or password.' };
    },
    [getUsers]
  );

  const signup = useCallback(
    (userData: Omit<User, 'id' | 'createdAt'>): { success: boolean; message: string } => {
      const users = getUsers();

      const existingUser = users.find(
        (u: User) => u.email === userData.email || u.phone === userData.phone
      );
      if (existingUser) {
        return { success: false, message: 'User with this email or phone already exists.' };
      }

      const newUser: User = {
        ...userData,
        id: generateUserId(),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      return { success: true, message: 'Account created successfully!' };
    },
    [getUsers]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
