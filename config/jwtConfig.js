const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user.id }, // Include the user id in the token payload
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = generateToken;
