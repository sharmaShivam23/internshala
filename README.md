# 🎓 InternHub — Premium Internship Command Center

An advanced, student-centric internship search and tracking dashboard built with **Next.js 16 (App Router)** and **Tailwind CSS v4**. It interfaces directly with the Internshala hiring API and adds a suite of premium workflow tools to solve the exact problems students face during job hunting.

---

## ✨ Features

### 1. 🎨 Dual-Theme System (Default Light + Premium Dark)
- **Authentic Light Mode (Default)**: Mapped to resemble the clean white background and grey card boundaries of the original Internshala portal, featuring its signature sky blue (`#008bdc`) accents and active-state highlights.
- **Glowing Dark Mode (Toggle)**: Instantly transitions the canvas into a futuristic deep space dashboard (`#05050a`) built with custom translucent glass panels and glowing neon indigo accents.
- **Persistent Preferences**: Theme state caches in `localStorage` for visual consistency across refreshes.

### 2. ⚡ Live Resume & Skill Match Analyzer
- **Interactive Skills Profile Drawer**: Manage your skill keywords (e.g. React, Python, UI/UX, MS-Excel) with custom tagging and popular standard tags.
- **Match Score Badge**: Compares your skills with the predicted requirements for each internship and renders a glowing, color-coded **Match Percentage** directly on each card (e.g., `85% Match`).
- **Collapsible Insights Panel**: Expands to show exactly which skills overlap (**Matching Skills**) and highlights which high-demand ones you are missing (**Recommended to Learn**) to help tailor your resume and prepare for recruiter screens.

### 3. 📋 Personal Application Kanban Pipeline
- **Dual-View Dashboard**: Switch between *Explore Internships* and the *Application Tracker* instantly using a sliding header.
- **One-Click Tracking**: Click "Track App" on any card to immediately stage it in your personal pipeline.
- **Interactive Kanban Board**: Progress applications across five stages:
  1. `Applied 📝`
  2. `In Review 🔍`
  3. `Interviewing 🗓️` (triggers a custom **Date & Time Scheduler** input on the card)
  4. `Offer Secured 🎉` (unlocks celebratory indicators)
  5. `Closed / Rejected 🛑`
- **Private Logbooks**: Keep preparation notes, task requirements, and contact names private for each tracked card.
- **Live Statistics Board**: Displays **Total Tracked**, **Active Interviews**, **Offers Secured**, and your dynamic **Shortlist-to-Interview Conversion Rate**!

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Logic & Components**: [React](https://react.dev/) (Hooks, useMemo, useCallback)
- **Styling & Themes**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS variables
- **Data Persistence**: Client-side `localStorage` cache managers
- **API Architecture**: Next.js Server Route proxying the Internshala Search API to prevent CORS issues.

---

## 🚀 Installation & Setup

Follow these simple steps to run the project locally on your machine:

### 1. Clone & Navigate
Ensure you are inside the task directory:
```bash
# Verify files
dir
```

### 2. Install Dependencies
Install all required Node packages:
```bash
npm install
```

### 3. Run Development Server
Fire up the local dev server:
```bash
npm run dev
```

### 4. Open in Browser
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── internships/
│   │       └── route.js       # CORS proxy calling Internshala
│   ├── globals.css            # Semantic theme variables & animations
│   ├── layout.js              # Document wraps & metadata
│   └── page.js                # Coordinate scripts, view tabs, & states
├── components/
│   ├── ApplicationTracker.jsx # Kanban pipeline boards & metrics
│   ├── EmptyState.jsx         # Custom error/no results display
│   ├── FilterSidebar.jsx      # Sticky accordion filters & search inputs
│   ├── Header.jsx             # Theme switchers, tabs, & drawers
│   ├── InternshipCard.jsx     # Live match calculators & detail links
│   ├── InternshipList.jsx     # Card loops, pagination placeholders
│   ├── SkeletonCard.jsx       # Custom theme skeleton pulse cards
│   └── SkillProfileDrawer.jsx # Dynamic skill management forms
├── hooks/
│   └── useInternships.js      # Fetch handler calling Server Route
└── utils/
    ├── debounce.js            # Debounce helper for filter typing
    ├── filters.js             # Matching heuristics algorithms
    └── storage.js             # LocalStorage read/write wrappers
```
