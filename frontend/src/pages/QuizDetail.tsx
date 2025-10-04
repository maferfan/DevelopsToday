import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useParams } from 'react-router-dom';
import type { Quiz } from '../types/quiz';

export function QuizDetail() {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<Quiz>(`/quizzes/${id}`);
        setQuiz(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gray-600">Quiz not found.</p>
          <Link to="/quizzes" className="text-blue-600 hover:underline">
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-gray-400 rounded-xl bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between mb-6 gap-2">
          <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
          <Link to="/quizzes" className="mt-3  hover:bg-gray-200 text-white px-4 py-2 rounded-md font-medium">
            Back to Quizzes
          </Link>
        </div>

        <div className="space-y-4">
          {quiz.questions.map((q, idx) => (
            <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="font-semibold mb-2 text-gray-800">
                {idx + 1}. {q.prompt}{' '}
                <span className="text-xs ml-2 text-gray-500">({q.type})</span>
              </div>

              {q.type === 'BOOLEAN' && (
                <div className="text-sm text-gray-700">
                  Correct answer: {q.answers[0] === 'true' ? 'True' : 'False'}
                </div>
              )}

              {q.type === 'INPUT' && (
                <div className="text-sm text-gray-700">Correct answer: "{q.answers[0]}"</div>
              )}

              {q.type === 'CHECKBOX' && (
                <div className="space-y-1">
                  <div className="text-sm text-gray-700">Options:</div>
                  <ul className="list-disc ml-6 text-sm text-gray-600">
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-700 mt-2">
                    Correct answers: {q.answers.join(', ')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}