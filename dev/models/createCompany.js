const db = require("../config/dbConnection");

const { Sequelize, DataTypes } = require("sequelize");

const Create_company = db.define("company", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  databaseName: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
});

// This creates the table, dropping it first if it already existed
// User_login.sync({ force: true })

// User_login.sync()
//   .then(() => console.log('User table created successfully'))
//   .catch(err => console.log("Entered Wrong database credentials"));

module.exports = Create_company;
