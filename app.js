const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db'); // Import sequelize and connectDB
const { registerUser, loginUser, registerValidation, loginValidation } = require('./controllers/authController');

dotenv.config();  // Load environment variables from .env file
const app = express();

app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable CORS for all routes

// Authentication Routes
app.post('/api/auth/register', registerValidation, registerUser);
app.post('/api/auth/login', loginValidation, loginUser);

// Connect to Database
connectDB();

// Force Database Synchronization
(async () => {
  try {
    // This will drop and recreate all tables in the database
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully with force: true (tables dropped and recreated)');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
