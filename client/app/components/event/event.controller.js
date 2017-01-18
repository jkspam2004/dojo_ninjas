(function() {
    'use strict';

    angular
        .module('app')
        .controller("EventController", EventController); 

    EventController.$inject = ['$scope', '$location', '$window', 'userFactory'];

    function EventController($scope, $location, $window, userFactory) {
        $scope.error;
    }

})();
