/* login.controller.js */
(function() {
    'use strict';

    angular
        .module('app')
        .controller("LoginController", LoginController);

    LoginController.$inject = ['$scope', '$location', '$window', '$log', 'authFactory']; 

    function LoginController($scope, $location, $window, $log, authFactory) {
        var vm = this;
        vm.error = null;
        vm.login = login;

        function login() { 
            authFactory.login(vm, loginCallback);
            function loginCallback(res) {
                if (res.success) {
                    if (res.result) { 
                        // successful login, redirect to events
                        $location.url('/events');
                    } else {
                        vm.error = { message: "Login error", errors: ["Invalid login" ] };
                    }
                } else {
                    vm.error = { message: res.message, errors: ["Invalid email", "Invalid password"] };
                }
            }
        };
    }
})();
