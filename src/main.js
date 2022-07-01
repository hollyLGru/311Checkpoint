let express = require('express');
require("dotenv").config();
let bodyparser = require("body-parser")
let PORT = process.env.PORT || 8000;
let app = express();
app.use(bodyparser.json());

app.get ("/hello", function(req, res){
    let name = req.query.name;
    res.send("hey there!")
});

let router = require("./routes/routes");
app.use(router);


app.listen(PORT, function(){
    console.log("application started on port", PORT);
});

