import { Student } from '../db/models/students.js';

export const getAllStudents = async () => {
  const students = await Student.find();
  return students;
};

export const getStudentsById = async (studentId) => {
  const student = await Student.findById(studentId);
  return student;
};
