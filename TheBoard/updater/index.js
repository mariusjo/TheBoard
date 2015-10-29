//updater/index.js
(function (updater) {
    
    var socketio = require('socket.io');

    updater.init = function (server) {
        var io = socketio.listen(server);

        io.sockets.on("connection", function (socket) {
            console.log("A socket was connected");

            //socket.emit("showThis", "This is from the server");
            
            socket.on("join category", function (category) {
                //create room
                socket.join(category);
            });

            socket.on("newNote", function (data) {
                //sends the received data to all sockets, except from the sender
                socket.broadcast.to(data.category).emit("broadcast note", data.note);
            });

        })
    };
      
})(module.exports);
