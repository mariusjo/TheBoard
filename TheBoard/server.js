var http = require('http');
var express = require('express');

var app = express();
//support master pages
//var ejsEngine = require('ejs-locals');

var controllers = require('./controllers');

var bodyParser = require('body-parser');

var flash = require('connect-flash');

var session = require('express-session');

var cookieParser = require('cookie-parser');

var testing = null;

//Setup the View Engine

//jade
//Express takes care of require, etc.
//app.set("view engine", "jade");


//EJS
//usingEJS-locals ->  have to require ourselves.
//app.engine("ejs", ejsEngine);
//app.set("view engine", "ejs");

//vash
app.set("view engine", "vash");

//opt into services
//needed in order to ge the body from a post
app.use(bodyParser.urlencoded({extended: true}))
//for temp. storing of info in session
app.use(cookieParser());
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true}));
app.use(flash());


//set the public static resource folder
app.use(express.static(__dirname+"\\public"));

//init controllers
controllers.init(app);

app.get("/api/users", function (req, res) {
    res.set({
        "Content-Type": "application/json"
    });
    //application/json  --  'text/plain'
    //res.contentType('application/json');
    //This will be serialized as JSON
    res.send({ name: "Marius", isvalid: true, group: "Admin" });
    


});

var server = http.createServer(app);

server.listen(3000);