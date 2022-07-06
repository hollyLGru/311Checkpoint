let express = require("express");

let router = new express.Router();

let controller = require("../controllers/controller");

let auth = require("../middleware/auth");

// this one requires authentication (checking the token! )
router.get("/myPANGEA", auth.verifyJWT, controller.entries);

// get any entry by ID ONLY IF YOU ARE THE OWNER!!!! 
router.get("/myPANGEA/:id", auth.verifyJWT, controller.entryID);

// delete item ONLY IF YOU ARE THE OWNER!!!! 
router.delete("/myPANGEA/:id", auth.verifyJWT, controller.deleteEntry);

// create a new entry and assign ownership/person who is creating it 
router.post("/myPANGEA", auth.verifyJWT, controller.createEntry);

// Update an entry ONLY IF YOU ARE THE OWNER!!!! 
router.put("/myPangea/:id", auth.verifyJWT, controller.updateEntry);



// HEY YOUSIF!!! I AM STILL WORKING ON THESE BELOW!! THANK YOU FOR YOUR HELP :) 

// Share an entry
// if you are the owner specified by ID, it will update the database for that entry and add a random public ID to that column
//router.put("myPangea/:id/share", auth.verifyJWT, ????);

//how to get shared link (to get an entry without being logged in/not the owner) 
//router.get("myPangea/shared/:id/:publicID", ?????????????)

//update entries
// set publicID = 'slkjfkskldgjsdlkgjgd' where id = 1 and UserID = 1 

//the owner of this document can make it private/unsharable by removing the public random ID and set it to NULL
//router.put("myPangea/:id/unshare", auth.verifyJWT, ?????);

module.exports = router;


// how to add a tag entry, how to untag an entry, want to be able to search for something with a tag