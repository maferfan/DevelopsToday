import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import type { QuizListItem } from '../types/quiz';

export function QuizList() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const resp = await api.get('/quizzes');
      console.log('GET /quizzes response:', resp.data); 

      const arr = Array.isArray(resp.data) ? resp.data : [];
      setQuizzes(arr);
    } catch (e) {
      console.error(e);
      setQuizzes([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await api.delete(`/quizzes/${id}`);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (e) {
      console.error(e);
      alert('Error deleting quiz');
    }
  };

  return (
    <div className="flex justify-center items-center border-2 border-gray-400 rounded-xl bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
          <Link
            to="/create"
            className="mt-3  hover:bg-gray-200 text-white px-4 py-2 rounded-md font-medium"
          >
            New Quiz
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : quizzes.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
            No quizzes yet. Create your first one!
          </div>
        ) : (
          <ul className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-custom">
            {quizzes.map((q) => (
              <li
                key={q.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <Link
                    to={`/quizzes/${q.id}`}
                    className="font-semibold text-lg text-black hover:underline"
                  >
                    {q.title}
                  </Link>
                  <div className="text-sm text-gray-600">{q.questionsCount} question(s)</div>
                </div>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="text-white hover:text-red-800 font-medium"
                  title="Delete quiz"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}