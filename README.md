# Quiz Builder

Fullstack application for creating and managing quizzes, built with **React + Vite** (Frontend) and **Node.js + Express + Prisma** (Backend).  
Uses **SQLite** via Prisma ORM for a lightweight, zero-config local database — ideal for testing or small-scale apps.

---

## ✨ Highlights

- **Frontend:** React 19 + Vite + TailwindCSS
- **Backend:** Node.js + Express + TypeScript + Prisma
- **Database:** SQLite (auto-created via Prisma)
- **Validation:** React Hook Form + Zod
- **Routing & HTTP:** React Router DOM + Axios

---

## 📁 Project Structure

quiz-builder/
├── backend/ # API with Express + Prisma (SQLite)
│ ├── src/
│ ├── prisma/
│ ├── package.json
│ └── tsconfig.json
│
├── frontend/ # React + Vite + Tailwind frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.ts
└── README.md


---

## ⚙️ Requirements

Before starting, make sure the following are installed:

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Git**

> **Note:** You don't need to install or configure a database manually — SQLite will create a local file automatically.

---

## 🗄️ Database Setup (SQLite + Prisma)

### 1) Create `.env` in backend

Create a file at `backend/.env` with:

```env
DATABASE_URL="file:./dev.db"
2) Initialize Prisma
From the backend folder, run:

bash
Copy
cd backend
npx prisma generate
npx prisma migrate dev --name init
Prisma will create a local SQLite database at prisma/dev.db.

3) Inspect the database (optional)
bash
Copy
npx prisma studio
This opens a local web UI to inspect and edit quiz data.

🚀 Starting the Application
1) Run the Backend
bash
Copy
cd backend
npm install
npm run dev
Backend server:
http://localhost:4000

2) Run the Frontend
bash
Copy
cd frontend
npm install
npm run dev
Frontend app:
http://localhost:5173

🧩 Creating a Sample Quiz
Once the backend is running, send a POST request to seed a quiz.

Endpoint: POST http://localhost:4000/api/quizzes

Request Body:

json
Copy
{
  "title": "Logic Quiz",
  "description": "Test your basic reasoning skills.",
  "questions": [
    {
      "text": "What is the result of 3 + 2?",
      "options": ["4", "5", "6"],
      "answer": "5"
    },
    {
      "text": "If Jane has 10 oranges and gives away 4, how many remain?",
      "options": ["5", "6", "7"],
      "answer": "6"
    }
  ]
}
Useful Routes
GET /api/quizzes → Retrieve all quizzes
GET /api/quizzes/:id → Retrieve one quiz by ID
🛠️ Tech Stack
Frontend
React 19 + TypeScript
Vite
TailwindCSS
React Hook Form + Zod
Axios
React Router DOM
Backend
Node.js + Express
TypeScript
Prisma ORM
SQLite (local database)
Dotenv
CORS
📜 Available Scripts
Frontend (/frontend)
npm run dev — Start dev server
npm run build — Create production build
npm run preview — Preview built app
npm run lint — Run ESLint
npm run format — Auto-format with Prettier
Backend (/backend)
npm run dev — Start server with ts-node-dev
npm run build — Compile TypeScript
npm start — Run compiled server
🪄 Tips
Start the backend first, then the frontend.
Reset the database:
bash
Copy
npx prisma migrate reset
Visualize/edit data:
bash
Copy
npx prisma studio
👤 Author
Developed as a technical test project showcasing a fullstack setup with React, Node.js, Prisma, and SQLite for rapid prototyping.

Author: DevelopsToday
