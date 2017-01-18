(function() {
    'use strict';

    angular
        .module('app')
        .factory('socket', chatFactory);

    chatFactory.$inject = ['$rootScope'];

    function chatFactory($rootScope) {
        var host = "http://localhost:8003";
        var socket = io.connect(host);

        var service = {
            on: on,
            emit: emit,
            currentId: currentId,
        };
        return service;

        function on (eventName, callback) {
            console.log("factory socket on", eventName);
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }

        function emit (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }

        function currentId() {
            return socket.id;
        }
    }

})();
