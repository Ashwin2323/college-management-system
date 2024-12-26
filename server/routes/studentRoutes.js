const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

const router = express.Router();

router.route('/')
  .get(protect, getAllStudents)
  .post(protect, createStudent);

router.route('/:id')
  .get(protect, getStudentById)
  .put(protect, updateStudent)
  .delete(protect, deleteStudent);

module.exports = router;
