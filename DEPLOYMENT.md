# Deployment Guide: FinVault

This guide will walk you through deploying your MERN stack application step-by-step.
We will deploy the **Backend** to **Render** and the **Frontend** to **Vercel**.

## Prerequisites
- GitHub account (where your code is pushed).
- [Render](https://render.com) account.
- [Vercel](https://vercel.com) account.
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) account.

---

## Part 1: Database Setup (Why Compass isn't enough)

> **Important**: Render is a cloud server. It **cannot access** the MongoDB running on your laptop (localhost) that you view in Compass.
> To deploy, you **MUST** use a cloud database like **MongoDB Atlas**.

1.  **Create a Cloud Database**:
    *   Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas/database).
    *   Create a free **M0 Cluster**.
    *   Create a "Database User" (username & password).
    *   Allow access from "Anywhere" (Network Access -> `0.0.0.0/0`).
2.  **Get Connection String**:
    *   Click "Connect" -> "Drivers".
    *   Copy the string: `mongodb+srv://<user>:<password>@cluster...`
3.  **Connect Compass to the Cloud**:
    *   Open Compass.
    *   Paste that *new* connection string.
    *   Now Compass is showing your *Cloud* database!
4.  **Migrate Data** (Optional):
    *   If you want to move your local data to the cloud, use Compass.
    *   Open your local connection -> Export Collection (JSON).
    *   Open your cloud connection -> Import Collection (JSON).

---

## Part 2: Backend Deployment (Render)

1.  Log in to your **Render Dashboard**.
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository (`FinVault`).
4.  Configure the service with these exact settings:
    *   **Name**: `finvault-api` (or any unique name)
    *   **Root Directory**: `server` (Important! Your backend code is in this folder)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build`
        *(This installs dependencies and compiles your TypeScript code to JavaScript)*
    *   **Start Command**: `npm start`
        *(This runs `node dist/index.js` as defined in your package.json)*
5.  Scroll down to **Environment Variables** and add:
    *   `MONGODB_URI`: Paste your connection string from Part 1.
    *   `JWT_SECRET`: Enter a long, random code (e.g., `my_secret_key_12345`).
    *   `PORT`: `10000` (Render usually sets this automatically, but good to have).
6.  Click **Create Web Service**.
7.  **Wait** for the deployment to finish. It needs to show "Live".
8.  **Copy the Backend URL** from the top left (e.g., `https://finvault-api.onrender.com`). You need this for the Frontend.

---

## Part 3: Frontend Deployment (Vercel)

1.  Log in to your **Vercel Dashboard**.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository (`FinVault`).
4.  Configure the project:
    *   **Framework Preset**: It should auto-detect **Vite**.
    *   **Root Directory**: `.` (Leave as default, your frontend is in the root).
    *   **Build Command**: `npm run build` (Default).
    *   **Output Directory**: `dist` (Default).
5.  Click **Environment Variables** and add:
    *   **Key**: `VITE_API_URL`
    *   **Value**: Paste your **Backend URL** from Part 2 (e.g., `https://finvault-api.onrender.com`).
    *   *Important*: Do not add a trailing slash `/` at the end of the URL.
6.  Click **Deploy**.
7.  Vercel will build your site and give you a live URL (e.g., `https://finvault.vercel.app`).

---

## Part 4: Verification

1.  Open your **Frontend URL** (from Vercel).
2.  Try to **Sign Up** a new user.
3.  If successful, the app is talking to your Backend, and your Backend is talking to the Database.
4.  Enjoy your live application!
