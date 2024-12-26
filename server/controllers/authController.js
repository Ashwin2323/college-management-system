const User = require('../models/userModel');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

// Example: Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role, department, rollNumber } = req.body;

  try {
    // Create role-specific profile
    let profile;
    if (role === 'student') {
      profile = await Student.create({ rollNumber, department });
    } else if (role === 'teacher') {
      profile = await Teacher.create({ department });
    } else {
      return res.status(400).send('Invalid role');
    }

    // Create the user
    const user = await User.create({
      name,
      email,
      password,
      role,
      profile: profile._id
    });

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
