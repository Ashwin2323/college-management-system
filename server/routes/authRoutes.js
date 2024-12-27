const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// Signup route
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log('Hashed password before signup: ', hashedPassword);
//     console.log("Length of hashed password: ", hashedPassword.length); // Should print 60


//     const user = new User({ name, email, password: hashedPassword, role });
//     await user.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, userController.getProfile);
router.delete('/profile', protect, authorize('admin'), userController.deleteUser);


module.exports = router;
