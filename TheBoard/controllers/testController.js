//controllers.testpage.js
(function (testController) {
    testController.init = function (app) {
        
        var data = require("../data")
        
        //testing get user
        app.get("/api/user/:username", function (req, res) {
            var username = req.params.username;

            data.getUser(username, function (err,user) {
                if (err) {
                    req.flash("APITestError", "Something bad happened : " + err);
                    res.redirect("/");
                } else if(!user) {
                    req.flash("APITestError", "Was not able to get user. Try another username");
                    res.redirect("/");
                } else {
                    res.json(user);
                }
                
            })
        });
    };
    
})(module.exports);
