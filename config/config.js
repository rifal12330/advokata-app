module.exports = {
  "development": {
    "username": "root", // Ganti dengan username MySQL Anda
    "password": "advokata123", // Ganti dengan password MySQL Anda
    "database": "advokataDB", // Ganti dengan nama database Anda
    "host": "/cloudsql/amplified-coder-407814:asia-southeast2:advokata-db", // Ganti dengan connection name instance Cloud SQL
    "dialect": "mysql",
    "logging": false // Optional, set to false to disable logging
  },
  "test": {
    "username": "root", // Ganti dengan username MySQL Anda
    "password": "advokata123", // Ganti dengan password MySQL Anda
    "database": "advokataDB", // Ganti dengan nama database Anda
    "host": "/cloudsql/amplified-coder-407814:asia-southeast2:advokata-db", // Ganti dengan connection name instance Cloud SQL
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": "root", // Ganti dengan username MySQL Anda
    "password": "advokata123", // Ganti dengan password MySQL Anda
    "database": "advokataDB", // Ganti dengan nama database Anda
    "host": "/cloudsql/amplified-coder-407814:asia-southeast2:advokata-db", // Ganti dengan connection name instance Cloud SQL
    "dialect": "mysql",
    "logging": false // Optional, set to false to disable logging in production
  }
};
