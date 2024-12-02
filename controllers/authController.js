const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registrasi Pengguna
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  try {
    // Cek apakah pengguna sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: true, message: 'Email already exists' });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ error: false, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
};

// Login Pengguna
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Cari pengguna
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }

    // Periksa password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      error: false,
      message: 'Login successful',
      loginResult: { userId: user.id, name: user.name, token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
