let express = require("express");

let router = new express.Router();

let controller = require("../controllers/controller");

let auth = require("../middleware/auth");

// this one requires authentication (checking the token! )
router.get("/myPANGEA", auth.verifyJWT, controller.entries);

// get any entry by ID
router.get("/myPANGEA/:id", controller.entryID);

// get all entries made by a user but only if you are that user 
router.get("/myPANGEA/userentries/:id", controller.getEntriesByUserID );
// router.get("/myPANGEA/userentries/:id", auth.verifyJWT, controller.UserID);


// get all of a users entries by continent 
router.get("/myPANGEA/continent/:continent", auth.verifyJWT, controller.continententries);

// delete item ONLY IF YOU ARE THE OWNER!!!! 
router.delete("/myPANGEA/:id", controller.deleteEntry);

// create a new entry and assign ownership/person who is creating it 
// router.post("/myPANGEA", auth.verifyJWT, controller.createEntry);
router.post("/myPANGEA", auth.verifyJWT, controller.createEntry);

// Update an entry ONLY IF YOU ARE THE OWNER!!!! 
router.put("/myPangea/:id", controller.updateEntry);


module.exports = router;


// how to add a tag entry, how to untag an entry, want to be able to search for something with a tag