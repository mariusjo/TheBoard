



(function (database) {
    
    //get mongodb project
    var mongodb = require('mongodb');
    //get the instance url
    var mongoUrl = "mongodb://localhost:27017/theBoard";
    //database
    var theDb = null;

    database.getDb = function (next) {
        if (!theDb) {
            //connect to the databse and get reference
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db,
                        notes:db.collection("notes")
                    }
                    next(null, theDb);
                }
            });
        } else {
            //pass back to caller if db exists. keeping dbconnection open is recomended
            next(null, theDb);
        }
        
    };
    
})(module.exports);