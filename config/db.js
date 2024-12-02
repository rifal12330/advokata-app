const { Sequelize } = require('sequelize');
require('dotenv').config();

const INSTANCE_CONNECTION_NAME = process.env.INSTANCE_CONNECTION_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const ENV = process.env.NODE_ENV || 'development';

// Validasi variabel lingkungan
const requiredEnv = ['DB_USER', 'DB_PASS', 'DB_NAME'];
requiredEnv.forEach((env) => {
    if (!process.env[env]) {
        console.error(`Missing required environment variable: ${env}`);
        process.exit(1);
    }
});

const sequelizeConfig = {
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
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

const connectWithRetry = async () => {
    let retries = 5;
    while (retries) {
        try {
            await sequelize.authenticate();
            console.log('Koneksi ke database berhasil');
            break;
        } catch (err) {
            retries -= 1;
            console.error(`Koneksi gagal. Retry dalam 5 detik (${retries} percobaan tersisa)`);
            await new Promise((res) => setTimeout(res, 5000));
        }
    }
    if (!retries) process.exit(1);
};

connectWithRetry();

module.exports = { sequelize, connectDB: connectWithRetry };
