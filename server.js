// *Dotenv
require("dotenv").config();

// *Packages
const express = require("express");

// *Import modules
const errorHandler = require("./middleware/errorHandler");

// *Database
// !Dev
// const dbDev = require("./dev/config/dbConnection");
// dbDev
//   .sync()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.log(`Entered Wrong database credentials:\n${err}`));

// !Production
const db = require("./config/db.config");
db.sync()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(`Entered Wrong database credentials:\n${err}`));

// *Test
// db.authenticate()
//   .then(() => console.log("Database Connected..."))
//   .catch((err) => console.error(err));

const app = express();

// *Middleware
app.use(express.json());

// *Routes
const authRoutes = require("./routes/auth.routes");

// *API
app.use("/api/v1", authRoutes);

// !Dev
// const createCompany = require("./dev/routes/createCompany.routes");
// app.use("/dev", createCompany);

// *Error Handler.
app.use(errorHandler);

// *Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
