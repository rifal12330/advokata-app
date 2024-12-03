const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

// Protected route example
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.user });
});

module.exports = router;
