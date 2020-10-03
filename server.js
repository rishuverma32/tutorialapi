const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app= express();

const db = require("./models");
db.mongoose
    .connect(db.url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("connected to the database.");
    })
    .catch(err=>{
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

var corsOptions={
    origin:"http://localhost:8081"
};

//app.use(cors(corsOptions));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//parse request of content-type- json
app.use(bodyParser.json());

//parse request of content-type- x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req,res)=> {
    res.json({ message: "welcome to bobspace" });
});



require("./routes/turorial.routes")(app);

// set port, listen for requests
const PORT =process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})