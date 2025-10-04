import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../services/api';
import { QuestionFormItem } from '../components/QuestionFormItem';
import { Link, useNavigate } from 'react-router-dom';
import type { QuizFormData } from '../types/quiz';

const questionSchema = z.object({
  type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
  prompt: z.string().min(1, 'Question prompt is required'),
  optionsText: z.string().optional(),
  answersCsv: z.string().optional(),
  answers: z.array(z.string()).optional(),
  options: z.array(z.string()).optional(),
});

const formSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z
    .array(questionSchema)
    .min(1, 'At least one question is required'),
});

export function CreateQuiz() {
  const navigate = useNavigate();
  const methods = useForm<QuizFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      questions: [{ type: 'BOOLEAN', prompt: '', answers: ['true'] }],
    },
  });

  const { control, handleSubmit, register, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: QuizFormData) => {
    const normalized = {
      title: data.title,
      questions: data.questions.map((q) => {
        if (q.type === 'CHECKBOX') {
          const options = (q.optionsText ?? '')
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean);
          const answers = (q.answersCsv ?? '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
          return { type: q.type, prompt: q.prompt, options, answers };
        }
        if (q.type === 'BOOLEAN') {
          return {
            type: q.type,
            prompt: q.prompt,
            options: [],
            answers: [q.answers?.[0] ?? 'true'],
          };
        }
        return {
          type: q.type,
          prompt: q.prompt,
          options: [],
          answers: [q.answers?.[0] ?? ''],
        };
      }),
    };

    try {
      await api.post('/quizzes', normalized);
      alert('Quiz created successfully!');
      reset();
      navigate('/quizzes');
    } catch (e) {
      console.error(e);
      alert('Error creating quiz');
    }
  };

  return (
    <div className="flex justify-center items-center border-2 border-gray-400 rounded-xl bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-3 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Create Quiz</h1>
        <Link
          to="/quizzes"
          className=" hover:bg-gray-200 text-white px-4 py-2 rounded-md font-medium"
        >
          Back to Quizzes
        </Link>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Quiz Title
                </span>

                <input
                  className="mt-1 block text-black bg-gray-100 border-gray-300 w-full borde rounded-md p-2 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Enter quiz title"
                  {...register('title')}
                />
              </label>
            </div>

            <div className="space-y-4 space-x-4 max-h-[400px] overflow-y-auto scrollbar-custom">
              {fields.map((field, idx) => (
                <QuestionFormItem
                  key={field.id}
                  index={idx}
                  remove={() => remove(idx)}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-md font-medium"
                onClick={() =>
                  append({
                    type: 'BOOLEAN',
                    prompt: '',
                    answers: ['true'],
                    optionsText: '',
                    answersCsv: '',
                  })
                }
              >
                + Add Question
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Save Quiz
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
