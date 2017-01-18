(function () {
    'use strict';

    angular
        .module('app')
        .controller("ChatController", ChatController);

    ChatController.$inject = ['$scope', 'userFactory', 'socket', '$location', '$window', '$log'];

    function ChatController ($scope, userFactory, socket, $location, $window, $log) {
        console.log("client chatroomController");

        $scope.error;
        $scope.ninja_self = {};

        var currentUser = $window.localStorage;

        /* client socket */

        /* set name */
        //var username = $scope.ninja_self.first_name + ' ' + $scope.ninja_self.last_name;
        var username = $window.localStorage.currentUserEmail;
        $log.debug("chatFactory user", username);
        socket.emit("set:user", username);

        /* join default rooms: general and cohort */
        $scope.rooms = [];
        $scope.rooms.push({ room: 'general', joined: true });  
        $scope.rooms.push({ room: $scope.ninja_self.cohort, joined: true });  
        for (var i=0; i<$scope.rooms.length; i++) {
            socket.emit('join', $scope.rooms[i] );
        }

        /* user added a new room */
        $scope.addRoom = function() {
            console.log("newRoom", $scope.newRoom.room);
            socket.emit('new:room', { room: $scope.newRoom.room });
            $scope.rooms.push({ room: $scope.newRoom.room, joined: true });  
            $scope.newRoom = {};
        }

        /* listen for newly added room and add to view list but joined is false */
        socket.on("new:room", function(data) {
            $scope.rooms.push({ room: data.room, joined: false });
        });

        /* join/leave room */
        $scope.change = function(room) {
            socket.emit(room.joined ? 'join' : 'leave', room);
        }
        console.log("clientId", socket.currentId());

        /* set the default room */
        $scope.showRoom = {};
        if (!$scope.showRoom.room) {
            console.log("no room chosen");
            $scope.showRoom = { room: 'general', show: true };
            socket.emit('get:rooms');
            socket.emit('get:messages', 'general');
        }

        /* get the updated room roster */
        socket.on('getting:rooms', function(data) {
            console.log("client get", $scope.showRoom.room, data);
            $scope.showRoom.users = data[$scope.showRoom.room];
        });

        /* switching rooms */
        $scope.setRoom = function(room) {
            console.log("clicked set room");
            $scope.showRoom = { room: room.room, show: true };
            socket.emit('get:rooms');
            socket.emit('get:messages', room.room);
        }

        /* post a message */
        $scope.post = function() {
            socket.emit('post', {
                room: $scope.showRoom.room,
                message: escape($scope.newMessage),
                by: username,
                on: (new Date() + "")
            });
            $scope.newMessage = '';
        }

        socket.on('publish', function(post) {
            console.log("publish", post);
        //    $scope.messages = unescape(post.message);
        });

        socket.on('getting:messages', function(messages) {
            $scope.messages = unescape(messages);
            console.log("scope messages", $scope.messages);
        });

        /*

        socket.on('publish', function (post) {
          //console.log(data);
          $("#stream").html($("#stream").html() + "room: " + post.room + "<br/>");
          $("#stream").html($("#stream").html() + "by: " + post.by + "<br/>");
          $("#stream").html($("#stream").html() + "on: " + post.on + "<br/>");
          $("#stream").html($("#stream").html() + "message: " + unescape(post.message) + "<br/>");
          $("#stream").html($("#stream").html() + "=============================================<br/>");
        });


        $("#postBtn").click(function() {
          socket.emit('post', {room: $("#postToRoom").val(), message: escape($("#postMessage").val()), by: $("#postBy").val(), on: (new Date() + "") });
        });
        */


    }
})();
