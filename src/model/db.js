// how you connect to database using MYSQL

let mysql = require('mysql');

let connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST
})

connection.connect();

connection.query("select now()", function(err, results){
    if(err){
        console.log("couldnt connect", err)
    } else {
        console.log("connected to database", results);
    }
})

module.exports = connection; 