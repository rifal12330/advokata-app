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
    tableName: 'Users', // Nama tabel di database
    timestamps: true, // Menambahkan kolom createdAt dan updatedAt
});

// Hook untuk enkripsi password sebelum menyimpan ke database
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

module.exports = User;
