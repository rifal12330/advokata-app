const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');
const {
  registerUser,
  loginUser,
  registerValidation,
  loginValidation,
} = require('./controllers/authController');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Rute autentikasi
app.post('/api/auth/register', registerValidation, registerUser);
app.post('/api/auth/login', loginValidation, loginUser);

// Koneksi ke database
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
