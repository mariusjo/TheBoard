//controllers/index.js
(function (controllers) {
    
    var homeControllers = require('./homeController.js');
    var noteControllers = require('./notesController.js');
    

    controllers.init = function (app) {
        homeControllers.init(app);
        noteControllers.init(app);

    };
    
})(module.exports);