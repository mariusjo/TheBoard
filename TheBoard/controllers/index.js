(function (controllers) {
    
    var homeControllers = require('./homeController.js');

    controllers.init = function (app) {
        homeControllers.init(app);
    };
    
})(module.exports);