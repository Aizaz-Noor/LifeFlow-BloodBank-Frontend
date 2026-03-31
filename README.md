# LifeFlow Blood Bank Management System

> A modern, full-featured frontend for managing blood bank operations — donors, inventory, donation camps, requests, TTI screening, thalassemia patients, and more. Built for Pakistan's healthcare context.

**Live Repo:** [github.com/Aizaz-Noor/LifeFlow-BloodBank-Frontend](https://github.com/Aizaz-Noor/LifeFlow-BloodBank-Frontend)

---

## 📸 Screenshots

### 🌐 Public Landing Page

| Hero Section | Blood Statistics |
|:---:|:---:|
| ![Homepage Hero](./public/screenshots/01_homepage_hero.png) | ![Stats Bar](./public/screenshots/02_homepage_stats.png) |

| Features | Testimonials |
|:---:|:---:|
| ![Features](./public/screenshots/03_homepage_features.png) | ![Testimonials](./public/screenshots/04_homepage_testimonials.png) |

| Quality Promise | How to Donate |
|:---:|:---:|
| ![Quality](./public/screenshots/05_homepage_quality.png) | ![Process](./public/screenshots/06_homepage_process.png) |

| Real-Time Blood Availability | About Page |
|:---:|:---:|
| ![Blood Availability](./public/screenshots/07_blood_availability.png) | ![About](./public/screenshots/08_about_page.png) |

| Contact Page | Footer |
|:---:|:---:|
| ![Contact](./public/screenshots/09_contact_page.png) | ![Footer](./public/screenshots/10_footer.png) |

---

### 🔐 Staff Portal

| Login | Dashboard |
|:---:|:---:|
| ![Login](./public/screenshots/12_login.png) | ![Dashboard](./public/screenshots/11_dashboard.png) |

| Donor Management | Blood Requests |
|:---:|:---:|
| ![Donors](./public/screenshots/13_donors.png) | ![Requests](./public/screenshots/14_requests.png) |

| Donation Camps | Reports & Analytics |
|:---:|:---:|
| ![Camps](./public/screenshots/15_camps.png) | ![Reports](./public/screenshots/16_reports.png) |

| Thalassemia Module (Dark Mode) | TTI Screening (Dark Mode) |
|:---:|:---:|
| ![Thalassemia](./public/screenshots/17_thalassemia.png) | ![TTI Screening](./public/screenshots/18_tti_screening.png) |

| Blood Wastage Tracker | Audit Log |
|:---:|:---:|
| ![Wastage](./public/screenshots/19_wastage_tracker.png) | ![Audit Log](./public/screenshots/20_audit_log.png) |

---

## Tech Stack

| Technology | Version |
|---|---|
| React | 19.x |
| Vite | 6.x |
| Tailwind CSS | 4.x |
| JavaScript (JSX) | ES Modules |

---

## Project Structure

```
BloodBank-Frontend/
├── public/
│   └── screenshots/          # App screenshots (used in README)
├── src/
│   ├── lib/                  # Shared utilities
│   │   ├── data.js           # Mock data & business logic helpers
│   │   └── icons.jsx         # Centralized SVG icon library
│   ├── components/
│   │   └── common/           # Reusable layout components
│   │       ├── Sidebar.jsx   # Navigation sidebar
│   │       ├── TopBar.jsx    # Header with dark mode + notifications
│   │       └── NotifPanel.jsx# Sliding notification panel
│   ├── pages/                # Feature pages
│   │   ├── Home.jsx          # Public landing page
│   │   ├── Login.jsx         # Authentication
│   │   ├── Dashboard.jsx     # Admin KPI overview
│   │   ├── Donors.jsx        # Donor management
│   │   ├── Requests.jsx      # Blood request tracking
│   │   ├── Camps.jsx         # Donation camp scheduling
│   │   ├── Reports.jsx       # Analytics & CSV export
│   │   ├── Thalassemia.jsx   # Thalassemia patient registry
│   │   ├── TTIScreening.jsx  # Infection screening module
│   │   ├── Wastage.jsx       # Blood wastage tracker
│   │   ├── AuditLog.jsx      # System audit trail
│   │   └── modals/           # Modal dialogs per feature
│   │       ├── AddDonorModal.jsx
│   │       ├── AddCampModal.jsx
│   │       └── AddRequestModal.jsx
│   ├── App.jsx               # Root orchestrator (~90 lines)
│   └── index.css             # Global styles & CSS variables
├── index.html
├── vite.config.js
└── package.json
```

---

## Features

- 🔐 **Authentication** — Login / Signup with role-based views
- 📊 **Dashboard** — Real-time blood inventory KPIs
- 👥 **Donor Management** — Add, edit, search, and filter donors
- 📋 **Blood Requests** — Track and fulfil incoming blood requests
- 🏕️ **Camp Management** — Schedule and manage donation camps
- 🧪 **TTI Screening** — Track Transfusion-Transmissible Infection tests
- 🧬 **Thalassemia Module** — Dedicated patient management
- 📉 **Wastage Tracking** — Log and analyze blood unit wastage
- 📝 **Audit Log** — Full system activity trail
- 📈 **Reports** — Exportable analytics and statistics
- 🏠 **Public Home Page** — Donor recruitment landing page

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Aizaz-Noor/LifeFlow-BloodBank-Frontend.git
cd LifeFlow-BloodBank-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Demo login:** Email: `admin@lifeflow.pk` | Password: `admin123`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📸 Screenshots

> Dashboard, Donor Management, and Audit Log screenshots can be found in the `docs/` folder (coming soon).

---

##  Author

**Aizaz Noor** — Software Engineering, Semester 3  
📧 aizaznoorkhuwaja@gmail.com

---

## 📄 License

This project is for academic purposes — **LifeFlow Blood Bank Management System** (University Project).
