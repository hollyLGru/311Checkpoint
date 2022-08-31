let db = require("../model/db");
let argon = require("argon2");
// codes the passwordhash
let jwt = require("jsonwebtoken");
// to make jsonwebtoken

// this code above is how a user creates an account 
let register = async function(req, res){ // REMEMBER ASYNC BCUZ WE USE ARGON
    console.log("register");
    // add a user to the database
    let email = req.body.email;
    let password = req.body.password;

    let pwHash = await argon.hash(password); // remember AWAIT bcuz ARGON 
    let params = [ email, pwHash];

    let sql = "insert into usersjune14(email, pw_hash) values ( ?, ?)" ;


    db.query(sql, params, function(err, results){
        if(err){
            console.log("Couldnt add user:", err);
            res.sendStatus(500) //bcuz this is our mistake not client
        } else {
            res.sendStatus(204); //everything went according to plan. 
        }
    })

};

// this will take in a username or email && a password.
// It will return a JSON WEB TOKEN (JWT)
// JTW can be used in subsequent requests to prove that the user is authenticated 
let login = async function(req, res){
    console.log("LOGIN");
    let email = req.body.email;
    let password = req.body.password;
    let dbPWHash;
    let sql = "select id, pw_hash from usersjune14 where email = ?" ;
    let params = [email];

    db.query(sql, params, async function(err, results){
        if(err){
            console.log("couldnt log in ");
            res.sendStatus(500);
            return; // use return so you dont need to write and else statement 
        };

        if(results.length > 1){ // if there were more than one emails that showed up, then that is an error because we used UNIQUE for email
            console.log("there is more than one long in for ", email);
            res.sendStatus(500);
            return;
        }; // there is an error because there is more than one of this email in our database 

        if(results.length == 0){
            console.log("testtesttesttest")
            res.sendStatus(400);
            return;
        }; // if there isnt a result for this email, that means that email login wasnt created

        dbPWHash = results[0].pw_hash; // we need to get the hash from the database
        let goodPassword = await argon.verify(dbPWHash, password);
            // code above is directly from ARGON2 documentation!!!
        let token = {
            "email": email,
            "message": "hey girl hey",
            "userID" : results[0].id
        };

        if(goodPassword){
            let signedToken = jwt.sign(token, process.env.JWT_SECRET)
            res.send(signedToken);
            //if the password is good or the correct password, then we will respond with this token
        } else {
            console.log("???????")
            res.sendStatus(400); // it is 400 because client made mistake, they sent wrong email/pass combo 
        }
    });

}


// let login = async function(req, res){
//     console.log("LOGIN");
//     let email = req.body.email;
//     let password = req.body.password;

//     let sql = "select id, passwordHash from usersjune14 where email = ?" ;
//     let params = [email];

//     db.query(sql, params, async function(err, results){
//         if(err){
//             console.log("couldnt log in ");
//             res.sendStatus(500);
//             return; // use return so you dont need to write and else statement 
//         };

//         if(results.length > 1){ // if there were more than one emails that showed up, then that is an error because we used UNIQUE for email
//             console.log("there is more than one long in for ", email);
//             res.sendStatus(500);
//             return;
//         }; // there is an error because there is more than one of this email in our database 

//         if(results.length == 0){
//             console.log("testtesttesttest")
//             res.sendStatus(400);
//             return;
//         }; // if there isnt a result for this email, that means that email login wasnt created

//         let hash = results[0].passwordHash; // we need to get the hash from the database
//         let goodPassword = await argon.verify(hash, password);
//             // code above is directly from ARGON2 documentation!!!
//         let token = {
//             "email": email,
//             "message": "hey girl hey",
//             "userID" : results[0].id
//         };

//         if(goodPassword){
//             let signedToken = jwt.sign(token, process.env.JWT_SECRET)
//             res.send(signedToken);
//             //if the password is good or the correct password, then we will respond with this token
//         } else {
//             console.log("???????")
//             res.sendStatus(400); // it is 400 because client made mistake, they sent wrong email/pass combo 
//         }
//     });

// }

module.exports = {
    register,
    login
};