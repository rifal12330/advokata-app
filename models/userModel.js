const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Hook untuk enkripsi password sebelum menyimpan ke database
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

module.exports = User;
