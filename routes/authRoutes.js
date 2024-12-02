const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Make sure this model is properly defined
const router = express.Router();

// Registrasi Pengguna Baru
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Debug input
        console.log('Request Body:', req.body);

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('Email already exists');
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed:', hashedPassword);

        // Simpan pengguna baru
        const newUser = await User.create({ name, email, password: hashedPassword });
        console.log('User created:', newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login Pengguna
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cari pengguna berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verifikasi password dengan password yang disimpan di DB
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, message: 'Login successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Logout Pengguna (Token-based, hanya menghapus token di client)
router.post('/logout', (req, res) => {
    // Dengan JWT, logout biasanya hanya dilakukan dengan menghapus token di client-side
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
