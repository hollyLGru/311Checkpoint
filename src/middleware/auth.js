let jwt = require("jsonwebtoken");

//THE FUNCTION VERIFYjwt:
//code to verify user with token from the header 
// if the token is BAD , then a status 404
// if the token is good, then do the regular controller stuff

let verifyJWT = function(req, res, next){
    let header = req.get("Authorization");
    //authorization is located in the header
    let signedToken;
    if(header){
        let parts = header.split(" ");
        //this is because we dont neeed the whole header value, just the signed token portion
        signedToken = parts[1];
        //EXAMPLE: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJsYWNrQGdtYWlsLmNvbSIsIm1lc3NhZ2UiOiJoZXkgZ2lybCBoZXkiLCJpYXQiOjE2NTU0Mjc0MTF9.3e4-rd-c0f-aJqgsHKaad3RI4MfKytnNJ9LJWvVl1Dg
    }

    if(signedToken){
        try{
            let token = jwt.verify(signedToken, process.env.JWT_SECRET);
            console.log("we want to find what is ", token);
            req.userID = token.userID;
            
            next()
        } catch(err){
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }

};

module.exports = {
    verifyJWT
}