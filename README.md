# ApexOKR: Enterprise Goal Setting & Tracking Portal

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

**ApexOKR** is a full-stack, professional-grade platform designed to align personal ambition with organizational growth. Built for the AtomQuest Hackathon, this portal facilitates transparent OKR (Objectives and Key Results) setting, quarterly performance tracking, and continuous managerial feedback.

![ApexOKR Demo](https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80) <!-- Placeholder image, replace if needed -->

## 🚀 Live Demo

- **Frontend Application:** [Deployed on Vercel](#) *(Insert Vercel Link)*
- **Backend API:** [Deployed on Render](#) *(Insert Render Link)*

### Demo Credentials:
- **Employee Portal:** `employee@apexokr.com`
- **Manager Portal:** `manager@apexokr.com`
- **Admin Console:** `admin@apexokr.com`

---

## 🌟 Key Features

### Phase 1: Planning & Approvals
- **Employee Drafts:** Employees can define up to 8 goals across strategic Thrust Areas (Sales, Operations, Innovation, etc.).
- **Strict Validation:** Total weightage is strictly validated to equal 100%.
- **Manager Review:** Managers can review team submissions, execute inline edits, and definitively Approve or Return goals for rework.

### Phase 2: Execution & Tracking
- **Quarterly Check-ins:** Employees log their actual achievements against their predefined targets.
- **Continuous Feedback:** Managers provide documented feedback on quarterly progress.
- **Audit Logging:** Admins have access to a complete, timestamped history of all goal modifications and approvals.

### Enterprise Governance
- **Dynamic Scheduling:** Admins can visually configure the exact start dates for Goal Setting phases and Quarterly Review windows.
- **Data Export:** 1-click generation of comprehensive CSV achievement reports.
- **Dark/Light Mode:** A fully custom, glassmorphic design system supporting both Sapphire Light and True Dark themes.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework:** React 18 + Vite (for lightning-fast HMR)
- **Styling:** Custom Vanilla CSS with dynamic CSS Variables for theming (No bloated CSS frameworks).
- **Icons:** `lucide-react` for crisp, professional iconography.
- **State Management:** React Hooks (`useState`, `useEffect`) propagating via Context/Props.

### Backend
- **Server:** Node.js + Express.js
- **Database:** SQLite3 (Serverless, ultra-fast local database ideal for hackathon demonstrations).
- **API:** RESTful endpoints for Auth, Goal CRUD, and Reporting.

---

## 💻 Local Development

Follow these steps to run the ApexOKR portal locally on your machine.

### Prerequisites
- Node.js (v20.x recommended)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/AtomquestHackathon2026-ApexOKR.git
   cd AtomquestHackathon2026-ApexOKR
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm install
   node server.js
   ```
   *The backend will automatically create a `database.sqlite` file and seed it with the demo users. It runs on `http://localhost:5000`.*

3. **Start the Frontend UI**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend will be accessible at `http://localhost:5173`. By default, it communicates with the local backend.*

---

## 📝 License & Hackathon Details
This project was developed exclusively for the **AtomQuest Hackathon 2026**. 
All source code is provided under the MIT License.
