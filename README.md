# sixeleven-hr
Streamline your HR operations — all in one place.
A modern, full-featured HR management portal built with React & TypeScript. Designed for teams who want a clean, fast, and intuitive HR experience.


✨ Features
📊 Dashboard — Stats, charts & recent activity
👥 Employee Management — Add, edit, search & filter employees
🕐 Attendance — Check-in tracking with weekly chart
🌴 Leave Management — Apply & approve leaves with workflow
💰 Payroll — Payslips table with detailed breakdown
🎯 Recruitment — Kanban pipeline for hiring
📈 Performance Reviews — KPI gauges & evaluations
📢 Announcements & Events — Company-wide updates
⚙️ Settings — Role & permission matrix



🛠️ Tech Stack
TechnologyPurposeReact 18Frontend UITypeScriptType safetyTanStack RouterFile-based routingTailwind CSSStylingFramer MotionAnimationsViteBuild toolBunPackage manager


📁 Project Structure

sixeleven-hr/
├── src/
│   ├── components/
│   │   ├── layout/        # AppShell, Sidebar, Topbar
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities & helpers
│   ├── routes/            # All pages/routes
│   │   ├── _app.dashboard.tsx
│   │   ├── _app.employees.tsx
│   │   ├── _app.attendance.tsx
│   │   ├── _app.leave.tsx
│   │   ├── _app.payroll.tsx
│   │   ├── _app.recruitment.tsx
│   │   ├── _app.performance.tsx
│   │   ├── _app.announcements.tsx
│   │   └── _app.settings.tsx
│   ├── router.tsx
│   └── styles.css
├── package.json
├── tsconfig.json
└── vite.config.ts


🚀 Getting Started

Prerequisites

Node.js 18+
npm or bun


Installation

bash# Clone the repo
git clone https://github.com/your-username/sixeleven-hr.git

# Go into the folder
cd sixeleven-hr

# Install dependencies
npm install

# Start development server
npm run dev

Open http://localhost:3000 in your browser
