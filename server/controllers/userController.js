const User = require('../models/userModel');

// Controller to get the user profile (authenticated user)
const getProfile = async (req, res) => {
  try {
    // Find the user using the userId stored in the JWT (req.user.userId)
    const user = await User.findById(req.user.userId); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Send the user data back
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Controller to delete a user (admin only)
const deleteUser = async (req, res) => {
  try {
    // Find the user by their ID (provided as route parameter)
    const user = await User.findById(req.user.userId); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the user from the database
    await user.remove(); 
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getProfile, deleteUser };
