Quiz Builder
Fullstack application for creating and managing quizzes, built with React + Vite (Frontend) and Node.js + Express + Prisma (Backend). The project uses SQLite as the database (via Prisma ORM), making setup fast and lightweight — ideal for testing or small-scale applications.

Project Structure
quiz-builder/
├── backend/              # API with Express + Prisma (SQLite)
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/             # React + Vite + Tailwind frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── README.md
Requirements
Node.js >= 18.x
npm >= 9.x
Git
You don’t need to install or configure a database manually — SQLite will create a local file automatically.

Database Setup (SQLite + Prisma)
Inside the backend folder, create a .env file with:
DATABASE_URL="file:./dev.db"
Navigate to the backend folder and initialize Prisma:
bash
Copy
cd backend
npx prisma generate
npx prisma migrate dev --name init
Prisma will automatically create a local SQLite database file at prisma/dev.db.

To view or edit the database, run:

bash
Copy
npx prisma studio
This opens a local web UI to inspect and edit quiz data.

Starting the Application
Run the Backend
bash
Copy
cd backend
npm install
npm run dev
Backend server will start at:

http://localhost:4000
Run the Frontend
bash
Copy
cd frontend
npm install
npm run dev
Frontend will run at:

http://localhost:5173
Creating a Sample Quiz
Once the backend is running, send a POST request to seed a quiz.

Endpoint:
POST http://localhost:4000/api/quizzes
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
Useful Routes:
GET /api/quizzes → Retrieve all quizzes
GET /api/quizzes/:id → Retrieve one quiz
Tech Stack
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
Available Scripts
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
Tips
Start the backend first, then the frontend.
To reset the database:
bash
Copy
npx prisma migrate reset
To visualize data conveniently, use:
bash
Copy
npx prisma studio
Author
Developed as a technical test project showcasing a fullstack setup with React, Node.js, Prisma, and SQLite for rapid prototyping.
"# DevelopsToday"
