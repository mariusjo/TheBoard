//auth/index.js

(function (auth) {
    
    var data = require("../data");
    var hasher = require('./hasher.js');
    
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    
    function verifyUser(username, password, next) {
        data.getUser(username, function (err, user) {
            if (!err && user) {
                var testHash = hasher.computeHash(password, user.salt);
                if (testHash === user.passwordHash) {
                    next(null, user);
                    return
                }
            }
            next(null, false, { message: "Invalid Credentials" });
        });
    };
    
    
    
    //secure pages
    auth.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/login");
        }
        
    };
    
    auth.ensureAPIAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(401).send("Not authorized");
        }
    };
    
    
    


    auth.init = function (app) {
        //setup passport authentication
        passport.use(new LocalStrategy(verifyUser));
        passport.serializeUser(function (user, next) {
            next(null, user.username);
        });
        passport.deserializeUser(function (key, next) {
            data.getUser(key, function (err, user) {
                if (err) {
                    next(null, false, {message:"Failed to retrieve user!"});
                } else { 
                    next(null, user);
                }
                
            }

            )
        });
        
        app.use(passport.initialize());
        app.use(passport.session());
        
        //END PASSPORT CONFIGURATION
        //--------------------
        
        app.get("/login", function (req, res) {
            res.render("login", {title:"Login to the Board", message:req.flash("LoginError")});
        });
        
        
        app.post("/login", function (req, res, next) {
            
            var authFunction = passport.authenticate("local", function (err, user, info) {
                if (err) {
                    next(err)
                } else {
                    req.logIn(user,function (err) {
                        if (err) {
                            next(err);
                        } else {
                            res.redirect("/");
                        }
                        
                    });
                }
                
            });
            
            authFunction(req, res, next);

        });

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