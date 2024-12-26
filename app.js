const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./server/routes/authRoutes');
const studentRoutes = require('./server/routes/studentRoutes');
const teacherRoutes = require('./server/routes/teacherRoutes');
const { protect } = require('./server/middleware/authMiddleware');


const app = express();

app.use(express.json());
app.use(cors());

console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected successfully!');
  // app.listen(3000, () => {
    //   console.log('Server running on port 3000');
    // });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
  
  app.get('/', (req, res) => {
    res.send('Welcome to the College Management System!');
  });
  
  app.use('/api/auth', authRoutes);
  app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// app.listen(3000);
