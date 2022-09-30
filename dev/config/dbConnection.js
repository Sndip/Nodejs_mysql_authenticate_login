const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DEV_DB_NAME,
  process.env.DEV_DB_USER,
  process.env.DEV_DB_PASSWORD,
  {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: "mysql",
  }
);
