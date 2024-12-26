const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password before signup: ', hashedPassword);
    console.log("Length of hashed password: ", hashedPassword.length); // Should print 60


    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login Attempt:'); 
    console.log('Email:', email);
    console.log('Password:', password);

    const user = await User.findOne({ email });
    console.log('User Retrieved from DB:', user);
    console.log('Entered Password:', password);
    console.log('Stored Hash:', user.password);


    if (!user) {
      console.log('User not found in database');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match Result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token Generated:', token);

    res.status(200).json({
      message: 'Login successful',
      token: token,
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
