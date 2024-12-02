const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan konfigurasi Sequelize Anda benar

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Nama wajib diisi
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Email wajib diisi
        unique: true, // Email harus unik
        validate: {
            isEmail: true, // Validasi email
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Password wajib diisi
    },
}, {
    tableName: 'users', // Nama tabel di database
    timestamps: true, // Menambahkan kolom createdAt dan updatedAt
});

module.exports = User;
