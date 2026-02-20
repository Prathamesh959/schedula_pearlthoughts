# Schedula — Healthcare Appointment Scheduling App

A mobile-first, pixel-perfect healthcare appointment scheduling application built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Fully frontend-only with localStorage persistence — no backend required.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black)

## 🩺 Project Overview

Schedula is a frontend-only healthcare appointment scheduling app designed for mobile-first usage. Users can sign up, log in, browse doctors, view doctor profiles, book appointments, and manage their schedule — all stored in the browser's localStorage.

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| **Next.js 14** | App Router, file-based routing |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Pre-built UI components (Calendar, Button, Card, etc.) |
| **React Context API** | Global state for auth & appointments |
| **localStorage** | Persistent data storage (no backend) |
| **Lucide React** | Icon library |

## 📁 Folder Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Root redirect (→ login/dashboard)
│   ├── login/page.tsx          # Login screen
│   ├── signup/page.tsx         # Signup screen
│   ├── otp/page.tsx            # OTP verification screen
│   └── dashboard/
│       ├── page.tsx            # Home/Dashboard
│       ├── doctors/
│       │   ├── page.tsx        # Doctors listing with search/filter
│       │   └── [id]/page.tsx   # Doctor detail page
│       ├── appointments/
│       │   ├── page.tsx        # My appointments list
│       │   ├── book/[id]/page.tsx      # Booking flow (calendar + slots)
│       │   └── confirmation/page.tsx   # Booking confirmation
│       ├── profile/page.tsx    # User profile
│       └── records/page.tsx    # Medical records (placeholder)
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── bottom-nav.tsx          # Mobile bottom navigation
│   ├── doctor-card.tsx         # Doctor listing card
│   ├── search-bar.tsx          # Search input component
│   ├── otp-input.tsx           # OTP digit input boxes
│   ├── numeric-keypad.tsx      # Number pad for OTP
│   ├── time-slot-picker.tsx    # Morning/evening slot grid
│   └── protected-route.tsx     # Auth route guard
├── context/
│   ├── auth-context.tsx        # Authentication provider
│   └── appointment-context.tsx # Appointment state provider
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── constants.ts            # App constants & config
│   ├── mock-doctors.ts         # Mock doctor data (8 doctors)
│   └── utils.ts                # Helper utilities
└── public/
    └── doctors/                # Doctor avatar images
```

## 🔐 Authentication Flow

```
Signup → Store user in localStorage → Redirect to Login
Login → Validate against stored users → OTP Verification → Dashboard
Logout → Clear current user from localStorage → Redirect to Login
```

- **Signup** creates a user record in localStorage
- **Login** validates email/phone + password against stored users
- **OTP Verification** uses mock OTP `1234` for verification
- **Protected Routes** redirect unauthenticated users to `/login`
- **Auth Redirect** sends logged-in users away from `/login` and `/signup`

## 🚀 Run Locally

```bash
# Clone the repository
git clone <repo-url>
cd schedula_pearlthoughts

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deploy on Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **New Project** → Import your repo
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

No environment variables needed — the app is fully frontend-only.

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Color | `#00BCD4` (Cyan/Teal) |
| Font | Inter |
| Border Radius | `0.75rem` (12px) |
| Card Shadow | Soft, subtle box-shadow |
| Layout | Mobile-first, max-width 448px |

## 📝 Mock Data

- **Mock OTP**: `1234`
- **8 Doctors** with specializations: Cardiologist, Ophthalmologist, Dermatologist, Neurologist, Pediatrician, Orthopedic, Psychiatrist
- **Time Slots**: 5 morning + 5 evening slots

## 📄 License

MIT
