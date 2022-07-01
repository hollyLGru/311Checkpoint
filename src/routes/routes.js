let express = require("express");

let router = new express.Router();

let controller = require("../controllers/controller");

let auth = require("../middleware/auth");

// this one requires authentication (checking the token! )
router.get("/myPANGEA", auth.verifyJWT, controller.entries);

// this is an example of a route that does not requre authentication 
router.get("/myPANGEANoAuth", controller.entries);

// get any entry by ID 
router.get("/myPANGEA/:id", controller.entryID);


// delete item
router.delete("/myPANGEA/:id", auth.verifyJWT, controller.deleteEntry);

// delete item without AUTHENTICATION
router.delete("/myPANGEANoAuth/:id", controller.deleteEntry);


module.exports = router;