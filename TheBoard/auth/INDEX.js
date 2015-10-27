//auth/index.js

(function (auth) {
    
    var data = require("../data");
    var hasher = require('./hasher.js');
    
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    
    function verifyUser(username, password, next) {
        data.getUser(username,)
    };
    
    


    auth.init = function (app) {
        app.get("/register", function (req, res) {
            res.render("register", {title:"Register for the Board", message: req.flash("registrationError")});
        });
        app.post("/register", function (req, res) {
            
            var salt = hasher.createSalt();
            
            var user = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                passwordHash: hasher.computeHash(req.body.password,salt),
                salt:salt
            }

            data.addUser(user, function (err) {
                if (err) {
                    req.flash("registrationError", "Could not save user to database... Please try again later.");
                    res.redirect("/register");
                } else {
                    res.redirect("/login");
                }
                
            });

        });

        

    };
    
})(module.exports);