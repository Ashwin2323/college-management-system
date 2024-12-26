const bcrypt = require('bcryptjs');

const storedHash = '$2a$10$mGpRxI4yYnzwM29Otj.3T.PXeo6AmpLv0EYYvTgwEXrYs8SaWghry'; // Stored hash from DB
const password = 'pass123'; // The password entered

// Compare the entered password with the stored hash
bcrypt.compare(password, storedHash).then(isMatch => {
  console.log('Password match:', isMatch);  // Should print true if password matches
}).catch(err => console.log('Error comparing password:', err));
