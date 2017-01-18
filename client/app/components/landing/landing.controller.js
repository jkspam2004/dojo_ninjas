/* landing.controller.js */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LandingController', LandingController);

    LandingController.$inject = ['$scope', '$log', 'authFactory'];

    function LandingController($scope, $log, authFactory) {
        var vm = this;
        vm.currentUser = authFactory.isLoggedIn();
    }

})();
