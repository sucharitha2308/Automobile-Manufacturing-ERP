# AutoFlow ERP

Enterprise Resource Planning System for Automobile Manufacturing.

## Overview
AutoFlow ERP is a full-stack, enterprise-ready web application built using the MERN stack (MongoDB, Express.js, React 19, Node.js) and styled with Tailwind CSS. It is designed to demonstrate role-based workflows, manufacturing business processes, inventory management, production planning, and dashboards suitable for an automobile manufacturing company.

## Tech Stack
* **Frontend:** React 19, Vite, Tailwind CSS, React Router, Recharts, Lucide-React
* **Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs, Helmet, Express Rate Limit
* **Database:** MongoDB Atlas

## Modules Implemented
1. Admin Dashboard (KPIs, Charts)
2. Supplier Management
3. Raw Material Master
4. Procurement (Purchase Orders)
5. Inventory Management
6. Warehouse Management
7. Production Planning
8. Bill of Materials (BOM)
9. Sales & Customers
10. Reports & Analytics

## Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB (Local or Atlas)

### Backend Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your details.
4. Run `npm run seed` to populate dummy data (requires MongoDB to be running).
5. Run `npm run dev` to start the backend server.

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. Run `npm run dev` to start the React application.
4. Open `http://localhost:5173` in your browser.

## Default Credentials (Mock Data)
* **Admin:** admin@autoflow.com / password123
* **Procurement:** procurement@autoflow.com / password123

## Deployment
* **Backend:** Deploy to Render using the `/backend` directory. Set Environment Variables on Render dashboard.
* **Frontend:** Deploy to Vercel. Import the repo, set root directory to `frontend`.
* **Database:** Create a MongoDB Atlas cluster and use the connection string in your `.env`.

## Architecture
- **MVC Pattern** in the backend.
- **Context API** in the frontend for Authentication and Dark Mode.
- **Role-Based Access Control** (RBAC) ready schemas.
