const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Sesuaikan dengan model User Anda

// Fungsi untuk menangani registrasi
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Enkripsi password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return response sukses
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

module.exports = { registerUser };
