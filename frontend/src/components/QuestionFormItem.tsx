import { useFormContext } from 'react-hook-form';
import type { QuestionType } from '../types/quiz';

type Props = {
  index: number;
  remove: () => void;
};

export function QuestionFormItem({ index, remove }: Props) {
  const { register, watch } = useFormContext();
  const type: QuestionType = watch(`questions.${index}.type`);

  return (
    <div className="border border-gray-300 rounded-lg p-4 space-y-3 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-800">Question {index + 1}</h4>
        <button
          type="button"
          onClick={remove}
          className=" hover:bg-red-500 text-sm font-medium"
        >
          Remove
        </button>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Type</span>
        <select
          className="mt-1 block w-full border text-black bg-gray-100 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          {...register(`questions.${index}.type` as const)}
          defaultValue="BOOLEAN"
        >
          <option value="BOOLEAN">Boolean (True/False)</option>
          <option value="INPUT">Input (Short text)</option>
          <option value="CHECKBOX">Checkbox (Multiple correct)</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-black">Question Prompt</span>
        <input
          className="mt-1 block text-black bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your question"
          {...register(`questions.${index}.prompt` as const)}
        />
      </label>

      {type === 'BOOLEAN' && (
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Correct Answer</span>
          <select
            className="mt-1 block w-full border text-black bg-gray-100 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register(`questions.${index}.answers.0` as const)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      )}

      {type === 'INPUT' && (
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Correct Answer</span>
          <input
            className="mt-1 block w-full border border-gray-300 text-black bg-gray-100 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the correct answer"
            {...register(`questions.${index}.answers.0` as const)}
          />
        </label>
      )}

      {type === 'CHECKBOX' && (
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Options (one per line)</span>
            <textarea
              className="mt-1 block w-full border border-gray-300 text-black bg-gray-100 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Option A&#10;Option B&#10;Option C"
              {...register(`questions.${index}.optionsText` as const)}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Correct Answers (comma-separated, matching options exactly)
            </span>
            <input
              className="mt-1 block w-full border border-gray-300 text-black bg-gray-100 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Option A, Option C"
              {...register(`questions.${index}.answersCsv` as const)}
            />
          </label>
        </div>
      )}
    </div>
  );
}