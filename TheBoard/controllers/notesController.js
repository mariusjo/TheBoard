(function (notesController) {
    
    var data = require("../data");

    notesController.init = function (app) {
        
        app.get("/api/notes/:categoryName", function (req, res) {
            var categoryName = req.params.categoryName;
            data.getNotes(categoryName, function (err, notes) {
                
                if (err) {
                    res.status(400).send(err);
                } else {
                    //res.set("Content-Type", "application/json");
                    //res.send(notes);
                    //res.json uses more cpu, but provides a checksum for 403 not modified
                    res.json(notes.notes);
                }
                
            });
        });

        app.post("/api/notes/:categoryName", function (req, res) {
            var categoryName = req.params.categoryName;
            
            var noteToInsert = {
                note: req.body.note,
                color: req.body.color,
                author: "The dude"
            };
            
            data.addNote(categoryName, noteToInsert, function (err) {
                if (err) {
                    res.status(400).send("Failed to add note to datastore. Inner exception: " + err);
                } else {
                    res.status(201).json(noteToInsert);
                }
            });
            
        });
    };
}
)(module.exports);