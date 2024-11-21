const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  // Pastikan path-nya sesuai
const { connectDB } = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());  // Parsing JSON
app.use(cors());  // Mengizinkan CORS

// Rute untuk autentikasi
app.use('/api/auth', authRoutes);

// Koneksi ke Database
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
