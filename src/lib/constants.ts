export const APP_NAME = 'Schedula';

export const COLORS = {
  primary: '#00BCD4',
  primaryLight: '#E0F7FA',
  primaryDark: '#00838F',
  white: '#FFFFFF',
  black: '#1A1D1F',
  gray: {
    50: '#F8FAFB',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#ADB5BD',
    500: '#6C757D',
    600: '#495057',
    700: '#343A40',
    800: '#212529',
  },
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};

export const NAV_ITEMS = [
  { label: 'Find Doctor', href: '/dashboard', icon: 'search' },
  { label: 'Appointments', href: '/dashboard/appointments', icon: 'calendar' },
  { label: 'Records', href: '/dashboard/records', icon: 'records' },
  { label: 'Profile', href: '/dashboard/profile', icon: 'profile' },
] as const;

export const SPECIALIZATIONS = [
  'All',
  'Cardiologist',
  'Dermatologist',
  'Ophthalmologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic',
  'Psychiatrist',
  'Dentist',
] as const;

export const MORNING_SLOTS = [
  { id: 'ms1', time: '09:00 AM - 9:45AM', period: 'morning' as const, available: true },
  { id: 'ms2', time: '10:00 AM - 10:15AM', period: 'morning' as const, available: true },
  { id: 'ms3', time: '10:30 AM - 11:45AM', period: 'morning' as const, available: false },
  { id: 'ms4', time: '11:30 AM - 11:45AM', period: 'morning' as const, available: true },
  { id: 'ms5', time: '11:30 AM - 12:15PM', period: 'morning' as const, available: true },
];

export const EVENING_SLOTS = [
  { id: 'es1', time: '01:00 PM - 01:45PM', period: 'evening' as const, available: true },
  { id: 'es2', time: '01:00 PM - 2:15PM', period: 'evening' as const, available: true },
  { id: 'es3', time: '03:00 PM - 03:15PM', period: 'evening' as const, available: true },
  { id: 'es4', time: '03:00 PM - 03:15PM', period: 'evening' as const, available: false },
  { id: 'es5', time: '03:30 PM - 04:15PM', period: 'evening' as const, available: true },
];

export const MOCK_OTP = '1234';

export const STORAGE_KEYS = {
  USERS: 'schedula_users',
  CURRENT_USER: 'schedula_current_user',
  APPOINTMENTS: 'schedula_appointments',
  REMEMBER_ME: 'schedula_remember_me',
} as const;
