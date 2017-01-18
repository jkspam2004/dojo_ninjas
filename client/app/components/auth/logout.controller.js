/* logout.controller.js */
(function() {
    'use strict';

    angular
        .module('app')
        .controller("LogoutController", LogoutController);

    LogoutController.$inject = ['$scope', 'authFactory', '$location'];

    function LogoutController($scope, authFactory, $location) {
        authFactory.logout(function() {
            $location.path('/');
        });
    };
})();
