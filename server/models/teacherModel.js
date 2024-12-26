const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  department: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
