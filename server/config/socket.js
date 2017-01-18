/*
var rooms = (function() {
  var rooms = {'general': true }; // consider chatrooms by campus

  // get all rooms
  var getRooms = function() {
    console.log("server getRooms:", rooms);
    return rooms;
  }

  // serialize rooms into array
  var get = function() {
    var res = [];
    for (var room in rooms) {
      res.push(room); 
    }
    return res;
  }

  // add a room
  var addRoom = function(room) {
    if (!room || rooms[room]) {
      console.log("not adding room " + room);
      return false;
    } else {
      console.log("add room " + room);
      rooms[room] = true;
      return true;
    }
  }

  return {
    getRooms: getRooms,
    addRoom: addRoom,
    get: get,
  };
}());
*/

var messages = (function() {
  var messages = {};

  // get messages by room
  var get = function(room) {
    return messages[room];
  }
  var add = function(room, message) {
    console.log("add", room, message);
    if (!room || !message) {
      console.log("not adding message");
      return false;
    } else {
      if (!messages[room]) {
        messages[room] = [];
      }
      messages[room].push(message);
      console.log("from add", messages);
      return true;
    }
  }

  return {
    get: get,
    add: add
  };
}());


var users = (function() {
  var users = {};
  var rooms = {};

  /* set the user name with socket id */
  var setUser = function(data) {
    if (!data.name || users[data.id]) {
      return false;
    } else {
      users[data.id] = data.name;
    }
  }

  /* get all users */
  var getUsers = function() {
    return users;
  }

  /* get rooms and info */
  // consider when same user connects on different clients. different socket.id? 
  var getRooms = function(data) {
    console.log(data);
  
    for (var room in data) {
      var sockets = data[room].sockets;
      rooms[room] = {};
      for (var id in sockets) {
        if (users[id]) {
          rooms[room][users[id]] = true;
        }
      }
    }
    console.log("getRooms", rooms);
    return rooms;
  }


  var free = function(id) {
    if (users[id]) {
      delete users[id];
    }
  }

  return {
    setUser: setUser,
    getUsers: getUsers,
    getRooms: getRooms,
    free: free,

  };

}());

/* server socket */
module.exports = function(app, server) {
  console.log("server socket connect");
  var io = require('socket.io').listen(server);

  /* connect socket */
  io.sockets.on('connection', function(socket) {

    /* init. set user name */
    socket.on('set:user', function(user) {
      var data = { id: socket.id, name: user };
      users.setUser(data);
    });

    socket.on('get:rooms', function() {
      var rooms = users.getRooms(io.sockets.adapter.rooms);
      console.log("server on get", rooms);
      socket.emit('getting:rooms', rooms);
    });

    /* automatically join the newly created room and broadcast to other users */
    socket.on('new:room', function(data) {
      if (typeof data.room === 'string') {
        console.log('join room ' + data.room);
        socket.join(data.room);
        socket.broadcast.emit("new:room", { room: data.room });

        var rooms = users.getRooms(io.sockets.adapter.rooms);
        io.emit('getting:rooms', rooms);
      }
    });

    /* join room */
    socket.on('join', function (data) {
      console.log("data", data);
      console.log("listening to join room", data.room);
      if (Array.isArray(data.room)) {
        var i;
        for (i = 0; i < data.room.length; ++i) {
          console.log('join room ' + data.room[i]);
          socket.join(data.room[i]);
          socket.broadcast.emit("new:user", { room: data.room });

          var rooms = users.getRooms(io.sockets.adapter.rooms);
          io.emit("new:room", rooms);

        }
      } else if (typeof data.room === 'string') {
        console.log('join room ' + data.room);
        socket.join(data.room);
        socket.broadcast.emit("new:user", { room: data.room });
        var rooms = users.getRooms(io.sockets.adapter.rooms);
        io.emit('getting:rooms', rooms);
      }
    });

    /* leave room */
    socket.on('leave', function (data) {
      console.log("listening to leave room");
      if (typeof data.room === 'string') {
        console.log('leave room ' + data.room);
        socket.leave(data.room);

        var rooms = users.getRooms(io.sockets.adapter.rooms);
        io.emit('getting:rooms', rooms);

      }
    });

    /* post message */
    socket.on('post', function (data) {
      messages.add(data.room, data.message);
      io.sockets.in(data.room).emit('publish', data);
      var msg = messages.get(data.room);
      console.log("listening to post", msg);
      io.sockets.in(data.room).emit('getting:messages', messages.get(data.room));
    });

    /* get messages */
    socket.on('get:messages', function(room) {
      io.sockets.in(room).emit('getting:messages', messages.get(room));
    });

    /* clean up when user leaves, broadcast to other users */
    socket.on('disconnect', function () {
      socket.broadcast.emit('user:left', {
        name: users[socket.id]
      });
      var rooms = users.getRooms(io.sockets.adapter.rooms);
      io.emit('getting:rooms', rooms);

      users.free(socket.id);
    });

  });
}
