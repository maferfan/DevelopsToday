import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/quizzes', async (req, res) => {
  try {
    const { title, questions } = req.body as {
      title: string;
      questions: Array<{
        type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
        prompt: string;
        options?: string[];
        answers: string[];
      }>;
    };

    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Title and questions are required.' });
    }

    const created = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q: any) => ({
            type: q.type,
            prompt: q.prompt,
            options: JSON.stringify(q.options ?? []),
            answers: JSON.stringify(q.answers ?? []),
          })),
        },
      },
      include: { questions: true },
    });

    const parsed = {
      ...created,
      questions: created.questions.map((q: any) => ({
        ...q,
        options: JSON.parse(q.options || '[]'),
        answers: JSON.parse(q.answers || '[]'),
      })),
    };

    res.status(201).json(parsed);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error creating quiz.' });
  }
});

app.get('/quizzes', async (_req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { _count: { select: { questions: true } } },
      orderBy: { createdAt: 'desc' },
    });
    const list = quizzes.map((q: any) => ({
      id: q.id,
      title: q.title,
      questionsCount: q._count.questions,
      createdAt: q.createdAt,
    }));
    res.json(list);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error fetching quizzes.' });
  }
});

app.get('/quizzes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });

    const parsed = {
      ...quiz,
      questions: quiz.questions.map((q: any) => ({
        ...q,
        options: JSON.parse(q.options || '[]'),
        answers: JSON.parse(q.answers || '[]'),
      })),
    };

    res.json(parsed);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error fetching quiz.' });
  }
});

app.delete('/quizzes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.quiz.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error deleting quiz.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});