const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true, // Tambahkan createdAt dan updatedAt
        tableName: 'Users', // Pastikan nama tabel sama dengan di database
    }
);

// Hook untuk enkripsi password sebelum menyimpan ke database
User.beforeCreate(async (user) => {
    try {
        console.log('Hashing password for user:', user.email);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        console.log('Password hashed successfully');
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
});


module.exports = User;
