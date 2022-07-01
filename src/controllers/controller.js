let db = require("../model/db");

//entries was litenItems 
let entries = function(req, res){
    console.log("list Entries");

    let sql = "select id, date, city, country, diary, photo from entries";

    db.query(sql, function(err, results){
        if(err){
            console.log("couldnt get entries", err);
            res.sendStatus(500);
        } else{
            res.json(results);
        }
    })
}

// function to return entry by ID (ID)
let entryID = function(req, res){
    console.log("entry details by ID");
    let id = req.params.id;
    // so that when you type in the search bar the id #, this will assign what id you are searching for

    let sql = "select * from entries where id = ? and userId = ?";
    let params = []; // params is taking the place of the ? 
    params.push(id); // id is because that is the params 
    
    db.query(sql, params, function(err, results){
        if(err) {
            console.log("failed to execute query:", err);
            res.sendStatus(500); 
            // we send 500 because it is our fault not the client's fault 
        } else {
            if(results.length == 1){
                res.json(results[0])
            } else if (results.length > 1) {
                console.log("found more than one results for ID " + id);
                res.sendStatus(500);
                // we send a 500 bc this is a server error 
            } else if (results.length == 0) {
                // this means clients sent an ID that doesnt exist 
                res.sendStatus(404);
                // 404 means NOT FOUND !!
            }
        }
    })
    
};




// deleting an item:
let deleteEntry = function(req, res){
    console.log("we are deleting an entry");
    let id = req.params.id;

    let sql = "delete from entries where id = ? and userId = ?"
    let params = [id]

    db.query(sql, params, function(err, results){
        if(err){
            console.log("failed to delete item with id " + id, err)
            res.sendStatus(500)
        } else {
            res.sendStatus(204) // nothing to send back, but everything went as planned
        }
    })

};

module.exports = {
    entries, deleteEntry, entryID
}