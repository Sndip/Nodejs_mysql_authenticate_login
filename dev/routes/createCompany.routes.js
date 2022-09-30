const express = require("express");
const router = express.Router();

//Controller
const createCompanyController = require("../controller/createCompany.controller");

// Routes
router.post("/create/company", createCompanyController.postCreateCompany);

module.exports = router;
