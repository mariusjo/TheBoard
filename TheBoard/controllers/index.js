//controllers/index.js
(function (controllers) {
    
    var homeControllers = require('./homeController.js');
    var noteControllers = require('./notesController.js');
    var testController = require('././testController.js');
    

    controllers.init = function (app) {
        homeControllers.init(app);
        noteControllers.init(app);
        testController.init(app);

    };
    
})(module.exports);