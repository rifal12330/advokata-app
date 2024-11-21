const { Sequelize } = require('sequelize');
require('dotenv').config();

// Membaca variabel lingkungan dari file .env
const INSTANCE_CONNECTION_NAME = process.env.INSTANCE_CONNECTION_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Membuat koneksi menggunakan Sequelize dan Cloud SQL Socket
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: `/cloudsql/amplified-coder-407814:asia-southeast2:advokata-db`,  // Menyambung menggunakan socket Cloud SQL
    dialect: 'mysql',
    dialectOptions: {
        socketPath: `/cloudsql/amplified-coder-407814:asia-southeast2:advokata-db`,  // Menentukan path socket untuk Cloud SQL
    },
    logging: false,  // Matikan logging SQL jika tidak diperlukan
});

// Fungsi untuk menguji koneksi
const connectDB = async () => {
    try {
        await sequelize.authenticate();  // Verifikasi koneksi
        console.log('Koneksi ke database berhasil');
    } catch (error) {
        console.error('Tidak dapat menghubungkan ke database:', error);
        process.exit(1);  // Keluar jika koneksi gagal
    }
};

module.exports = { sequelize, connectDB };
