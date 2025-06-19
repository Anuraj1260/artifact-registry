# 📦 Artifact Registry – Decentralized Identity-Conscious System

A secure and modular MERN stack application built for Weblinear Technologies' Hackathon. This system enables authenticated users to manage personal digital artifacts (create, update, delete, view) within their own isolated identity environments, ensuring **data privacy**, **temporal tracking**, and **soft deletion** support.

---

## 🧠 Problem Statement

**"Decentralized Identity-Conscious Artifact Registry with Temporal Mutability Constraints"**

Design and implement a metadata-governed registry system that supports dynamic artifact provisioning in an identity-isolated environment. The system must ensure strict access control, session-aware transactional boundaries, temporal traceability, and lifecycle-bound object persistence.

---

## ✅ Key Features

- 🔐 **JWT-based Authentication**  
  Secure token-based login system with session expiration

- 👤 **Identity-Based Access Isolation**  
  Users can only access and manage their own artifacts

- 🧾 **CRUD Operations for Artifacts**  
  Create, Read, Update, and Delete (with soft delete flag)

- ⏳ **Temporal Mutability Tracking**  
  Each artifact tracks its creation and last updated timestamps

- 🗃️ **Soft Deletion with Traceability**  
  Artifacts are marked deleted (not removed from DB), ensuring audit-friendly logs

- 🚫 **Unauthorized Access Feedback**  
  Real-time frontend alerts on invalid or forbidden actions

---

## 🛠️ Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| Frontend     | React.js, CSS        |
| Backend      | Node.js, Express.js  |
| Database     | MongoDB (Mongoose)   |
| Auth System  | JSON Web Tokens (JWT)|
| Deployment   | Localhost (GCP-ready)|

---

## 📁 Folder Structure

artifact-registry/
├── client/ # Frontend - React
│ └── src/
│ ├── components/ (Auth, Artifacts, Dashboard)
│ ├── utils/ (API Config)
│ └── App.js, index.css
├── server/ # Backend - Express
│ ├── models/ (User, Artifact)
│ ├── routes/ (Auth, Artifact APIs)
│ ├── middleware/ (Auth Checker)
│ └── server.js
└── README.md

---

## 🚀 Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/Anu1260/artifact-registry.git
cd artifact-registry

🔧 Backend Setup
cd server
npm install

Create .env in /server:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Start the backend server:
node server.js
Server runs at: http://localhost:5000

💻 Frontend Setup
cd ../client
npm install
npm start
📍 Frontend runs at: http://localhost:3000

## 🔐 Login Page

![Login](public/screenshots/login.png)

## 📊 Dashboard

![Dashboard](public/screenshots/dashboard.png)


🔐 Authentication Flow
🔒 Users must log in to access their dashboard
🛡️ JWT tokens are stored in localStorage and used for API access
🚫 Unauthorized access shows alerts and prevents UI rendering

🎯 Hackathon Requirements Fulfilled
Requirement	Status
✅ Identity-Isolated Registry	✅ Done
✅ Artifact Lifecycle Management	✅ Done
✅ Temporal Constraints & Timestamps	✅ Done
✅ Soft Delete + Archival Flag	✅ Done
✅ Session-aware Access Control	✅ Done
✅ UI Feedback for Unauthorized Use	✅ Done

🧑‍💻 Author
Anu Raj
B.Tech CSE – Techno India University

“Designed and built for Weblinear Hackathon | A Proud Indian Project 🇮🇳”


