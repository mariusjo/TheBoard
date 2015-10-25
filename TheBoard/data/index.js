(function (data) {
    
    var seedData = require("./seedData.js");
    
    var database = require('./database');

    data.getNoteCategories = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.notes.find().sort({name: 1}).toArray(function (err, results) {
                       if (err) {
                        next(err, null);
                    } else { 
                        next(null, results);
                    }
                       
                });
            }
            
        });
    };
    
    
    data.createNewCategory = function(categoryName, next){
        database.getDb(function (err, db) {
            if (err) {
                next(err)
            } else {
                
                db.notes.find({name:categoryName}).count(function (err, count) {
                    if (err) {
                        next(err);
                    }
                    else {
                        if (count != 0) {
                            next("Category already exists");
                            
                        } else {
                            
                            var category = {
                                name: categoryName,
                                notes: []
                            }
                            db.notes.insert(category, function (err) {
                                if (err, null) {
                                    next(err)
                                } else {
                                    next(null);
                                }
                            })
                        
                        }
                        
                    }
                    
                }

                )

                

            }
            
        });
    };
    

    

    function seedDatabase() {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to seed database" + err);
            } else {
                //test to se if data exists
                db.notes.count(function (err, count) { 
                    if (err) {
                        console.log("Filed to retrieve database count");
                    } else {
                        if (count == 0) {
                            //seed the database
                            console.log("Seeding the database...");
                            seedData.initialNotes.forEach(function (item) {
                                db.notes.insert(item, function (err) {
                                       if (err) {
                                        console.log("Failed to insert document into database" + err);
                                       }
                                });
                            });
                        } else {
                            console.log("Database allready seeded");
                        }
                        
                    }
                    
                })

            }
            
        });
    };

    seedDatabase();
    
       
})(module.exports);
