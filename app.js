const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db'); // Import sequelize and connectDB
const authRoutes = require('./routes/authRoutes'); // Import authRoutes

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Authentication routes
app.use('/api/auth', authRoutes);

// Database connection
connectDB();

// Synchronize the database
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
