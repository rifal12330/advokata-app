const { Sequelize } = require('sequelize');
require('dotenv').config();

const INSTANCE_CONNECTION_NAME = process.env.INSTANCE_CONNECTION_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const ENV = process.env.NODE_ENV || 'development';

const sequelizeConfig = {
  dialect: 'mysql',
  logging: false,
};

if (ENV === 'production') {
  // Menggunakan socket Cloud SQL untuk produksi
  sequelizeConfig.host = `/cloudsql/${INSTANCE_CONNECTION_NAME}`;
  sequelizeConfig.dialectOptions = {
    socketPath: `/cloudsql/${INSTANCE_CONNECTION_NAME}`,
  };
} else {
  // Menggunakan IP publik untuk pengembangan
  sequelizeConfig.host = '34.128.122.222'; // Ganti dengan IP Cloud SQL jika tidak menggunakan proxy
  sequelizeConfig.port = 3306;
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, sequelizeConfig);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil');
  } catch (error) {
    console.error('Tidak dapat menghubungkan ke database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
