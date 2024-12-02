const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db'); // Mengimpor sequelize dan connectDB
const { registerUser, loginUser, registerValidation, loginValidation } = require('./controllers/authController');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Rute autentikasi
app.post('/api/auth/register', registerValidation, registerUser);
app.post('/api/auth/login', loginValidation, loginUser);

// Koneksi ke database
connectDB();

// Sinkronisasi Database
(async () => {
  try {
      await sequelize.sync({ alter: true }); // Mengupdate struktur tabel agar sinkron
      console.log('Database synchronized successfully');
  } catch (error) {
      console.error('Error synchronizing database:', error);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
