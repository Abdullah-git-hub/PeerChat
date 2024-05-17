const { Router } = require("express");
const userController = require("../controllers/userController");

const userRout = Router();

userRout.get("/", userController.loadIndex);

module.exports = userRout;
