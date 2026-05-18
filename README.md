# Hackathon Submission: ApexOKR Portal

**Project Name:** ApexOKR - Enterprise Goal Setting & Tracking Portal  
**Track/Problem Statement:** Professional Goal Tracking Phase 1 & 2  

---

## 1. Working Link
*Please replace the placeholder below with your live deployed URL (e.g., Vercel, Render, or Netlify)*

🔗 **Live Portal:** `[Insert Live Deployed Link Here, e.g., https://apexokr.vercel.app]`

**Demo Credentials:**
- Employee: `employee@apexokr.com`
- Manager: `manager@apexokr.com`
- Admin: `admin@apexokr.com`

---

## 2. Source Code Repository
*Please replace the placeholder below with the link to your public Git repository.*

💻 **Repository:** `https://github.com/ShivrajSS-git/AtomquestHackathon2026-ApexOKR/tree/main`

---

## 3. Architecture Diagram
The following diagram outlines the high-level architecture of the ApexOKR application, illustrating the flow of data between the client, the API layer, and the database.

```mermaid
graph TD
    %% Define Styles
    classDef frontend fill:#2563eb,stroke:#1d4ed8,stroke-width:2px,color:#fff;
    classDef backend fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff;
    classDef db fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff;
    classDef user fill:#64748b,stroke:#475569,stroke-width:2px,color:#fff;

    %% Actors
    Employee([Employee User]):::user
    Manager([Manager User]):::user
    Admin([Admin User]):::user

    %% Frontend App
    subgraph Frontend [React Frontend - Vite]
        UI[User Interface & Routing]:::frontend
        State[State Management]:::frontend
        AuthClient[Auth & Session]:::frontend
        
        UI <--> State
        State <--> AuthClient
    end

    %% Backend API
    subgraph Backend [Node.js & Express API]
        Router[API Router]:::backend
        AuthService[Authentication Service]:::backend
        GoalService[Goal Management Service]:::backend
        ReportService[Reporting Service]:::backend
        
        Router --> AuthService
        Router --> GoalService
        Router --> ReportService
    end

    %% Database
    subgraph Database [Data Layer]
        SQLite[(SQLite Database)]:::db
    end

    %% Connections
    Employee -->|Submit Goals & Track Check-ins| UI
    Manager -->|Review & Approve Goals| UI
    Admin -->|System Config & Audit Export| UI

    AuthClient <-->|REST / JSON| Router
    AuthService <--> SQLite
    GoalService <--> SQLite
    ReportService <--> SQLite
```

### Architecture Overview:
1. **Frontend (React.js + Vite):** A responsive, single-page application utilizing pure functional components and a custom dynamic CSS variable design system (Sapphire Light & Dark mode).
2. **Backend (Node.js + Express):** A lightweight RESTful API handling authentication, CRUD operations for goals/achievements, and role-based access control.
3. **Database (SQLite):** A fast, file-based relational database ensuring persistence of users, Phase 1 goal metrics, and Phase 2 quarterly achievements.
