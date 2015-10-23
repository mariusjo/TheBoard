var http = require('http');
var express = require('express');

var app = express();
//support master pages
//var ejsEngine = require('ejs-locals');


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

//defining server app routes
app.get("/", function (req, res) {
    res.render("index", {title:"Express + Vash"});
});

app.get("/api/users", function (req, res) {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "rompe":"jejeje",
        "Content-Type": "application/json"
    });
    //application/json  --  'text/plain'
    //res.contentType('application/json');
    //This will be serialized as JSON
    res.send({ name: "Marius", isvalid: true, group: "Admin" });
    //res.send("<user><name>Marius</name><isValid>true</isValid><group>Admin</group></user>");


});

var server = http.createServer(app);

server.listen(3000);