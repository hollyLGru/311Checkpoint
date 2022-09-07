let express = require('express');
require("dotenv").config();
let bodyparser = require("body-parser")
let PORT = process.env.PORT || 8000;
let app = express();

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000'],
    exposedHeaders: 'Authorization'
}));


app.use(bodyparser.json());
app.use(express.static('public'))

app.get ("/hello", function(req, res){
    let name = req.query.name;
    res.send("hey there!")
});

let router = require("./routes/routes");
app.use(router);

let userRoutes = require("./routes/userRoutes");
app.use(userRoutes);


app.listen(PORT, function(){
    console.log("application started on port", PORT);
});

