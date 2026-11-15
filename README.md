# Vetrion (வெற்றி) — Tamil Nadu Hyper-Local Job Marketplace

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)

**A modern, production-grade job marketplace connecting Tamil Nadu's workers with households, shops, contractors, farms, and businesses.**

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Project Structure](#-project-structure) • [Push to GitHub](#-how-to-push-to-github)

</div>

---

## 📖 Overview

**Vetrion (வெற்றி)** is a hyper-local job marketplace designed specifically for the Tamil Nadu ecosystem (covering Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, and Tirunelveli). 

The platform bridges the gap between daily-wage/monthly workers and employers (homes, retail shops, contractors, logistics companies, and farms) through direct communication (**Call Now** & **WhatsApp**) without middlemen.

---

## ✨ Key Features

### 👷 Worker Experience
- **Smart Job Search & Filtering:** Filter by City, Hiring Entity (Household, Shop, Company, Contractor, Farm), Pay Type (Daily Wage / Monthly Salary), and interactive Category chips.
- **1-Tap Quick Apply:** Seamless 1-tap modal collecting worker name & phone.
- **Direct Employer Contact:** Instant reveal of employer contact with **Call Now (`tel:`)**, **WhatsApp (`wa.me`)** with pre-filled message, and **Copy Number**.
- **Saved Bookmarks:** Persistent job bookmarking system.
- **Worker Profile Builder:** Create and save a rich profile (experience, expected pay, skills, availability) which automatically publishes to the Admin **Find Workers** directory.

### 🏢 Employer / Admin Experience
- **Worker Directory:** Discover skilled workers with filters for City, Availability (Available Now, Within a Week), and specific skills.
- **Post a Job:** Create new openings with support for custom work types using the dynamic **"Other"** option.
- **Your Posts & Applicant Tracking:** Manage posts, view applicant details (name, phone, timestamp), direct Call/WhatsApp links, toggle status (**Active / Closed**), and delete with a **2-Step Confirmation Modal**.
- **Admin Profile:** Save business/employer credentials that auto-prefill future job postings.

### 🌐 Cultural & Design Polish
- **Bilingual Support (தமிழ் / English):** Complete one-click language toggle across the entire application.
- **Doorway Arch Motif:** Signature Tamil architectural motif applied across logos, worker avatars, and statistics blocks.
- **Apple-Classy Light Theme:** Palette featuring Deep Indigo (`#1e1b4b`), Marigold Yellow (`#f59e0b`), and Pale Lilac (`#f7f5fd`).
- **Responsive Navigation:** Ergonomic desktop top navigation + mobile sticky bottom navigation bar.
- **Preloaded Realistic Data:** 19 diverse Tamil Nadu job postings and 16 skilled worker profiles.

---

## 🛠 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool:** [Vite 5](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom design tokens
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Context API + LocalStorage persistence
- **Typography:** Inter, Outfit, and Google Noto Sans Tamil

---

## 📂 Project Structure

```
thiran/
├── index.html                  # HTML entry point with fonts & metadata
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind theme & color tokens
├── postcss.config.js           # PostCSS plugins
├── .gitignore                  # Git ignore rules
└── src/
    ├── main.tsx                # Application bootstrap
    ├── App.tsx                 # Root layout & view router
    ├── index.css               # Global styles & Tailwind directives
    ├── types/
    │   └── index.ts            # TypeScript interfaces (Job, Worker, Application, etc.)
    ├── data/
    │   ├── mockJobs.ts         # 19 realistic Tamil Nadu job postings
    │   ├── mockWorkers.ts      # 16 skilled worker profiles
    │   └── categories.ts       # Work categories with icons
    ├── context/
    │   ├── AppContext.tsx      # Main application state & actions
    │   └── LanguageContext.tsx # EN / தமிழ் translation provider
    ├── i18n/
    │   └── translations.ts     # Bilingual dictionary
    └── components/
        ├── common/
        │   ├── DoorwayArch.tsx # Arch avatars & logo components
        │   ├── Modal.tsx       # Reusable accessible modal dialog
        │   └── ToastContainer.tsx # Floating notification system
        ├── layout/
        │   ├── Header.tsx      # Top bar with role & language toggles
        │   ├── HeroBanner.tsx  # Dynamic statistics & hero block
        │   ├── MobileBottomNav.tsx # Mobile sticky bottom navigation
        │   └── Footer.tsx      # Footer & demo reset action
        ├── worker/
        │   ├── FindWorkView.tsx # Search, filter & job feed
        │   ├── JobCard.tsx     # Job listing card
        │   ├── ApplyModal.tsx  # 1-tap apply & contact reveal
        │   ├── SavedJobsView.tsx # Bookmarked jobs list
        │   └── WorkerProfileView.tsx # Worker profile editor
        └── admin/
            ├── FindWorkersView.tsx # Worker directory search & filter
            ├── WorkerCard.tsx  # Worker profile card
            ├── ContactWorkerModal.tsx # Employer contact modal
            ├── PostJobView.tsx # Create job post form
            ├── YourPostsView.tsx # Manage job posts & applicants
            ├── AdminProfileView.tsx # Admin business profile
            └── DeleteConfirmModal.tsx # Two-step delete confirmation
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
The compiled, type-checked bundle will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🐙 How to Push to GitHub

Follow these steps to publish this codebase to your own GitHub account:

### Step 1: Create a new repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Enter the repository name: `vetrion` (or any name you prefer).
3. Choose **Public** or **Private**.
4. Leave "Add a README file", ".gitignore", and "license" **unchecked** (we already created them).
5. Click **Create repository**.

### Step 2: Push your local code
In your terminal inside this project folder, run:

```bash
# Initialize git (if not already done)
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "feat: initial commit for Vetrion job marketplace"

# Rename branch to main
git branch -M main

# Link your GitHub remote (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/vetrion.git

# Push to GitHub
git push -u origin main
```

---

## 🌐 Deploy to Vercel or Netlify

### Deploy with Vercel
1. Import your GitHub repository on [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

---

## 🔮 Next Phase Roadmap

- [ ] **Backend Database:** Migrate from `localStorage` to **Supabase** (PostgreSQL) or **Firebase Firestore** for real-time multi-device synchronization.
- [ ] **Authentication:** Phone OTP Login using **Twilio** or **Firebase Auth**.
- [ ] **Voice Search:** Speech-to-text in Tamil for workers searching for trades.
- [ ] **Geo-Location:** Proximity-based distance calculations (km radius).

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
