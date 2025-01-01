const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role, department, rollNumber } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create role-specific profile (student or teacher)
    let profile;
    if (role === 'student') {
      profile = await Student.create({ rollNumber, department });
    } else if (role === 'teacher') {
      profile = await Teacher.create({ department });
    } else {
      return res.status(400).send('Invalid role');
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profile: profile._id,
    });

    // Send response with the created user
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login a user and return JWT token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.cookie('token', token,{
      httpOnly: true,  // Ensure cookie is not accessible via JavaScript
      // No need to set 'secure' for development since you're using HTTP
      maxAge: 24 * 60 * 60 * 1000,  // Token expires in 1 day
    }); // Set secure cookie if in production

    res.status(200).json({
      message: 'Login successful',
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { registerUser, loginUser };
