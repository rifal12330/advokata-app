const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // Menggunakan bcryptjs untuk keamanan password
const jwt = require('jsonwebtoken');

// Registrasi pengguna baru
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan pengguna baru dengan password yang sudah dienkripsi
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login pengguna
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cari pengguna berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verifikasi password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token JWT
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

module.exports = { registerUser, loginUser };
