import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CreateQuiz } from './pages/CreateQuiz';
import { QuizList } from './pages/QuizList';
import { QuizDetail } from './pages/QuizDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quizzes" replace />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;