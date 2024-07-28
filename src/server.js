import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllStudents, getStudentsById } from './services/students.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/students', async (req, res, next) => {
    try {
      const students = await getAllStudents();

      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: students,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/students/:studentId', async (req, res, next) => {
    try {
      const { studentId } = req.params;
      const student = await getStudentsById(studentId);

      if (student === null) {
        res.status(404).json({
          message: 'Contact not found',
        });
        return;
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${studentId}!`,
        data: student,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
