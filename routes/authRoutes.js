const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Make sure this model is properly defined
const router = express.Router();

// Registrasi Pengguna Baru
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan pengguna baru dengan password yang sudah di-hash
        const newUser = await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
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
