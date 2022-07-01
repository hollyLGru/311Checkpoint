let express = require("express");
// brings in express 

let route = new express.Router();
// makes a new route 

let controller = require("../controllers/userController");



route.post("/register", controller.register);

route.post("/login", controller.login);

module.exports = route;