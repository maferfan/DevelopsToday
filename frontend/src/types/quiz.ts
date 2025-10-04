export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export type Question = {
  id: number;
  type: QuestionType;
  prompt: string;
  options: string[];
  answers: string[];
};

export type Quiz = {
  id: number;
  title: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
};

export type QuizListItem = {
  id: number;
  title: string;
  questionsCount: number;
  createdAt: string;
};


export type QuestionFormData = {
  type: QuestionType;
  prompt: string;
  optionsText?: string;
  answersCsv?: string;
  answers?: string[];   
  options?: string[];   
};

export type QuizFormData = {
  title: string;
  questions: QuestionFormData[];
};