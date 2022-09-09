let db = require("../model/db");

//ethis will return a list of ALL the entries every made 
let entries = function(req, res){
    console.log("list Entries");

    let sql = "select id, date, city, country, diary, photo, UserID, continent from pangeaEntries";

    db.query(sql, function(err, results){
        if(err){
            console.log("couldnt get entries", err);
            res.sendStatus(500);
        } else{
            res.json(results);
        }
    })
}

//ethis will return a list of ALL the entries about a continent
let continententries = function(req, res){
    console.log("list Entries by continent");
    let continent = req.params.continent;
    let sql = "select * from pangeaEntries where continent = ?";
    let params = []; // params is taking the place of the ? 
    params.push(continent); // id is because that is the params 

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

    let sql = `select * from pangeaEntries where id = ${id}`;
    // I need to figure out how to get the id of the entry by the ID of the user.. This is something I 
    // will try to figure out this week

    db.query(sql, function(err, results){
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

// function to return ALL entries per user (userID)
let getEntriesByUserID = function(req, res){
    let user_id = req.params.id;
    // so that when you type in the search bar the id #, this will assign what id you are searching for

    let sql = "select * from pangeaEntries where UserID = ?";
    // I need to figure out how to get the id of the entry by the ID of the user.. This is something I 
    // will try to figure out this week
    let params = []; // params is taking the place of the ? 
    params.push(user_id); // id is because that is the params 
    
    db.query(sql, params, function(err, results){
        if(err) {
            console.log("failed to execute query:", err);
            res.sendStatus(500); 
            // we send 500 because it is our fault not the client's fault 
        } else {
            if(results.length >= 1){
                res.json(results)
                console.log("this is it")
            } else if (results.length == 0) {
                // this means clients sent an ID that doesnt exist 
                res.sendStatus(404);
                console.log("no results")
                // 404 means NOT FOUND !!
            }
        }
    })
    
};


// deleting an item:
let deleteEntry = function(req, res){
    console.log("we are deleting an entry");
    let id = req.params.id;
    let sql = "delete from pangeaEntries where id = ?";
    // I need to figure out how to apply to UserId so that only the users can see their own posts
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
//CREATE ENTRY WORKS GREAT!!!
// Below is the function that will allow a USER to create a new entry
let createEntry = function(req, res){
    console.log("creating a new entry controllers.js line 126");
    let input = req.body;
    // it will be like the task example above that will be typed on postman body 
    let city = input.city;
    let country = input.country;
    let date = input.date;
    let photo = input.photo;
    let diary = input.diary;
    let continent = input.continent;
    let UserID = input.userID;
    console.log(input)

    if(!city || !country || !date || !diary || !continent  ) // if they do not include the city, country, date, or diary entry (photo can be null)
        {
            res.status(400).send("information is required");
            return;
        }

        // below is example of parameterized sql which avoids sql injections
        let sql = "insert into pangeaEntries(date, city, country, photo, diary, UserID, continent ) values (?, ?, ?,  ?, ?, ?, ?)";
        let params = [date, city, country, photo, diary, UserID, continent ];

        db.query(sql, params, function(err, results){
            if(err){
                console.log("could not execute SQL insert ", err);
                res.sendStatus(500);
            } else {
                res.sendStatus(204); // we dont have anything to return but that lets client know that everything went according to plan
            }
        });


};

// function to update/change an entry
let updateEntry = function(req, res){
    console.log("we are updating an entry");
    let id = req.params.id;
    // get the id from the path param

    let body = req.body;

    let city = body.city;
    let country = body.country;
    let date = body.date;
    let diary = body.diary;
    let photo = body.photo;
    let continent = body.continent;
    //make sure the entry (by ID) is in the body
    if(!city || !country || !date || !diary || !continent){
        res.status(400).send("entry is required");
        return;
    } 
    let params = [date, city, country, photo, diary, continent, id];
    let sql = "UPDATE pangeaEntries SET date = ?, city = ?, country = ?, photo = ?, diary = ? , continent = ? WHERE id = ? ";
    
    db.query(sql, params, (err, results)=>{
        if(err){
          console.log("could not issue query to database", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(204);
        }
      });
    };
module.exports = {
    entries, deleteEntry, entryID, createEntry, updateEntry, getEntriesByUserID, continententries
}