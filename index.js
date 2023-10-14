const express = require('express');
const db = require('./config/database');
const cors = require("cors");

//-------------------------------------------------------------------------
// load body-parser
const bodyParser = require("body-parser");
const app = express();
app.use('/assets', express.static('assets/'));
app.use(cors());
app.use(express.static(__dirname + '/terrainfiles'));

//-------------------------------------------------------------------------
// parse permintaan express - application / json
app.use(express.json());
// parse permintaan jenis konten - application / json
app.use(bodyParser.json());
// parse permintaan jenis konten - application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//-------------------------------------------------------------------------
// port untuk server lokal
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada Port : ${PORT}.`);
});

//-------------------------------------------------------------------------
// route index
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});


//User routes
require("./controller/User")(app);

//Admin routes
require("./controller/Admin")(app);

//Comment routes
require("./controller/Comment")(app);

//Follow routes
require("./controller/Follow")(app);

//Follower routes
require("./controller/Follower")(app);

//Like routes
require("./controller/Like")(app);

//Log routes
require("./controller/Log")(app);

//Notification routes
require("./controller/Notification")(app);

//Photopost routes
require("./controller/Photopost")(app);

//Posting routes
require("./controller/Posting")(app);

//Report routes
require("./controller/Report")(app);

//Terrain routes
require("./controller/Terrain")(app);

//Visitor routes
require("./controller/Visitor")(app);

//Login routes
require("./controller/Login")(app);

//Batuan routes
require("./controller/Batuan")(app);



//-------------------------------------------------------------------------
// Handling Errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});