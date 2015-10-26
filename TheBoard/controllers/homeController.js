(function (homeController) {
    homeController.init = function (app) {
        
        var data = require("../data");

        //defining server app routes
        app.get("/", function (req, res) {
            
            data.getNoteCategories(function (err, results) {
                res.render("index", {
                    title: "The Board", 
                    error: err, 
                    categories: results,
                    newCategoryError:req.flash("newCategoryName")

                });
            });
        });

        app.post("/newCategory", function (req, res) {
            var categoryName = req.body.categoryName;
            

            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    //Handle error
                    console.log(err);
                    req.flash("newCategoryName", err);
                    res.redirect("/");
                } else {
                    res.redirect("/api/notes/" + categoryName);
                }
                
            });

        });

    };
       
})(module.exports);