🎯 Quiz Builder

A fullstack application for creating and managing quizzes, built with React + Vite (Frontend) and Node.js + Express + Prisma (Backend).

The project uses SQLite as the database (via Prisma ORM), making setup fast and lightweight — ideal for testing or small-scale applications.

📁 Project Structure
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
│
└── README.md

⚙️ Requirements

Before starting, make sure the following are installed:

Node.js >= 18.x
npm >= 9.x
Git

Note: You don't need to install or configure a database manually — SQLite will create a local file automatically.

🚀 Getting Started
1️⃣ Clone the Repository
git clone <your-repo-url>
cd quiz-builder

2️⃣ Backend Setup
Navigate to backend folder
cd backend

Create .env file

Create a file named .env in the backend folder with the following content:

DATABASE_URL="file:./dev.db"
PORT=4000
NODE_ENV=development

Install dependencies
npm install

Initialize Prisma and Database
npx prisma generate
npx prisma migrate dev --name init


Prisma will automatically create a local SQLite database file at prisma/dev.db.

Start the backend server
npm run dev


✅ Backend server will start at: http://localhost:4000

3️⃣ Frontend Setup
Open a new terminal and navigate to frontend folder
cd frontend

Install dependencies
npm install

Start the frontend development server
npm run dev


✅ Frontend will run at: http://localhost:5173

🗄️ Database (Prisma + SQLite)
Useful Prisma Commands
Command	Description
npx prisma generate	Generate Prisma Client
npx prisma migrate dev --name init	Create/migrate database
npx prisma studio	Open database UI in browser
npx prisma migrate reset	Reset database (⚠️ clears all data)

SQLite file location: backend/prisma/dev.db

To view or edit the database, run:

npx prisma studio


→ This opens a local web UI to inspect and edit quiz data at http://localhost:5555

🧩 API Usage
Base URL
http://localhost:4000

Endpoints
Method	Endpoint	Description
POST	/api/quizzes	Create a new quiz
GET	/api/quizzes	Retrieve all quizzes
GET	/api/quizzes/:id	Retrieve one quiz by ID
Creating a Sample Quiz

Once the backend is running, send a POST request to seed a quiz.

Endpoint:
POST http://localhost:4000/api/quizzes

Request Body:
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

Example using cURL:
curl -X POST http://localhost:4000/api/quizzes \
  -H "Content-Type: application/json" \
  -d '{
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
  }'

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
npm run dev        # Start dev server
npm run build      # Create production build
npm run preview    # Preview built app
npm run lint       # Run ESLint
npm run format     # Auto-format with Prettier

Backend (/backend)
npm run dev        # Start server with ts-node-dev (watch mode)
npm run build      # Compile TypeScript
npm start          # Run compiled server

🔧 Environment Variables
Backend (backend/.env)
DATABASE_URL="file:./dev.db"
PORT=4000
NODE_ENV=development


Required:

DATABASE_URL - SQLite database connection string

Optional (with defaults):

PORT - Server port (default: 4000)
NODE_ENV - Environment mode (default: development)
📂 Folder-by-Folder Expectations
Backend Structure
backend/
├── src/
│   ├── server.ts              # Express app, routes, CORS, JSON middleware
│   └── routes/
│       └── quizzes.ts         # CRUD endpoints for quizzes
├── prisma/
│   ├── schema.prisma          # Quiz, Question models with relations
│   └── dev.db                 # SQLite database file (auto-generated)
├── package.json
├── tsconfig.json
└── .env

Frontend Structure
frontend/
├── src/
│   ├── App.tsx                # Main app with routes
│   ├── pages/
│   │   ├── QuizList.tsx       # List all quizzes
│   │   ├── QuizDetail.tsx     # View single quiz
│   │   └── CreateQuiz.tsx     # Create new quiz
│   ├── components/
│   │   ├── QuizForm.tsx       # Form component
│   │   └── QuizCard.tsx       # Quiz card component
│   └── services/
│       └── api.ts             # Axios base config
├── public/
├── package.json
└── vite.config.ts

🪄 Development Tips
Start the backend first, then the frontend.
If ports collide:
Backend: Change PORT in backend/.env
Frontend: Vite will suggest an alternate port or configure in vite.config.ts
Use npx prisma studio to view and edit data quickly.
For a clean slate: npx prisma migrate reset
🐛 Troubleshooting
Prisma client not found
cd backend
npx prisma generate

Database errors or missing tables
cd backend
npx prisma migrate dev --name init

CORS issues in frontend
Ensure backend has CORS enabled
Verify frontend uses the correct base URL (http://localhost:4000)
Port already in use
Change PORT in backend/.env
Or kill the process using that port:
# On Linux/Mac
lsof -ti:4000 | xargs kill -9

# On Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

Module not found errors
# In backend
cd backend
npm install

# In frontend
cd frontend
npm install

🎯 Project Goals

This project demonstrates:

✅ Fullstack TypeScript development
✅ RESTful API design with Express
✅ Database modeling with Prisma ORM
✅ Modern React with hooks and routing
✅ Form validation with React Hook Form + Zod
✅ Responsive UI with TailwindCSS
✅ Zero-config local database with SQLite
📄 License

This project is open source and available under the MIT License.

👤 Author

Developed as a technical test project showcasing a fullstack setup with React, Node.js, Prisma, and SQLite for rapid prototyping.

#DevelopsToday
