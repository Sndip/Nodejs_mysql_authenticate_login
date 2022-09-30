const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const AppError = require("../../utils/applicationError");
const { tryCatch } = require("../../utils/tryCatch");
const { DATABASE_ERROR } = require("../../constants/errorCodes");
const { validateCreateCompany } = require("../../utils/joiValidate");

const createCompany = require("../models/createCompany");
// const errorHandler = require("../../middleware/errorHandler");

exports.postCreateCompany = tryCatch(async (req, res, next) => {
  const { companyName, email, address, username, password, databaseName } =
    req.body;

  //Validation
  const { error } = validateCreateCompany(req.body);
  if (error) throw error;

  const hashedPassword = await bcrypt.hash(password, 10);

  const company = await createCompany.create({
    companyName,
    email,
    address,
    username,
    databaseName,
    password: hashedPassword,
  });

  //Database Creation
  function createDb() {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    // Run create database statement
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${databaseName}`,
      function (err, results) {
        console.log(`${databaseName} database Created`);
        console.log(results);
        console.log("Error:");
        console.log(err + "\n\n");
      }
    );

    connection.query(
      `CREATE TABLE IF NOT EXISTS ${databaseName}.logins(id INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL UNIQUE, role VARCHAR(45) NOT NULL,createdAt TIMESTAMP default current_timestamp not null, updatedAt timestamp default current_timestamp not null, PRIMARY KEY (id));`,
      function (err, results) {
        console.log(`Table Login at ${databaseName} database is created`);
        console.log(results);
        console.log("Error:");
        console.log(err + "\n\n");
      }
    );

    connection.query(
      `INSERT INTO ${databaseName}.logins(id, username, password, role) VALUES (DEFAULT, "${username}", "${hashedPassword}", "admin");`,
      function (err, results) {
        console.log(`Inserted Data successfully`);
        console.log(results);
        console.log("Error:");
        console.log(err);
      }
    );

    // Close the connection
    connection.end();
  }

  createDb();

  return res.status(200).json({
    success: true,
    message: `Company created`,
  });
});
