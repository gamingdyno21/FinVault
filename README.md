# 🏦 FinVault - AI-Powered Financial Dashboard

> **Simplify your personal finance tracking with AI-driven insights.**

FinVault is a comprehensive, full-stack financial management platform designed to help you take control of your financial health. It combines expense tracking, investment portfolio management, tax planning, and goal setting into a single, intuitive interface.

## 🚀 Unique Features

*   **Smart Dashboard**: Real-time overview of your net worth, income, expenses, and savings rate.
*   **Transaction Management**: effortlessly log and categorize your daily income and expenses.
*   **Investment Portfolio**: Track stocks, mutual funds, and crypto assets with automatic ROI calculations.
*   **🇮🇳 Indian Tax Planner**: Specialized tool to calculate tax liability and compare Old vs. New tax regimes.
*   **Goal Setting**: Define financial goals (e.g., buying a car) and track your progress with smart contribution suggestions.
*   **🤖 AI Insights**: Get intelligent analysis on your spending habits and personalized tips to save more.
*   **Secure & Private**: Built with robust JWT authentication and password encryption.

---

## 🛠️ Tech Stack

### Frontend
-   **React (v18)** with TypeScript
-   **Vite**: Next-generation frontend tooling
-   **Tailwind CSS**: Utility-first styling
-   **Shadcn UI**: Beautiful, accessible components
-   **Recharts**: Interactive charting library
-   **React Query**: Powerful asynchronous state management

### Backend
-   **Node.js & Express.js**: Scalable server-side runtime
-   **MongoDB & Mongoose**: Flexible NoSQL database schema
-   **JsonWebToken (JWT)**: Stateless authentication
-   **Bcrypt.js**: Secure password hashing

---

## ⚙️ Installation & Setup

Follow these steps to run FinVault locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/shreyabarla/Tech-Coders.git
cd clarity-finances-96-main
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 3. Configure Environment Variables
**Important**: You must create a `.env` file in the `server` folder.
A template file `server/.env` is provided. Open it and fill in your details:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```
> *Note: For `MONGO_URI`, use your MongoDB Atlas connection string for cloud access.*

### 4. Run the Application

**Start the Backend Server:**
```bash
# In the 'server' directory
npm run dev
```

**Start the Frontend:**
```bash
# In the root directory (open a new terminal)
npm run dev
```

Visit `http://localhost:5173` in your browser to start using FinVault!

---

## 🔮 Future Roadmap

-   [ ] **Mobile App**: Native Android/iOS app using React Native.
-   [ ] **Bank Sync**: Automatic transaction fetching via Account Aggregator.
-   [ ] **Data Export**: Download reports in PDF/Excel formats.
-   [ ] **Social Goals**: Share achievements with friends.

---

<p align="center">
  Built by <b>Shreya Barla and Team</b>
</p>