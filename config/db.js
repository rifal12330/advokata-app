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
  sequelizeConfig.host = `/cloudsql/${INSTANCE_CONNECTION_NAME}`;
  sequelizeConfig.dialectOptions = {
    socketPath: `/cloudsql/${INSTANCE_CONNECTION_NAME}`,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  sequelizeConfig.host = process.env.DB_HOST || '127.0.0.1';
  sequelizeConfig.port = process.env.DB_PORT || 3306;
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, sequelizeConfig);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil');
  } catch (error) {
    console.error('Koneksi database gagal:', error.message);
    process.exit(1);
  }
};

connectDB();

module.exports = { sequelize, connectDB };
