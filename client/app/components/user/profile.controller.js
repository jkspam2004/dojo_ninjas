(function() {
    'use strict';

    angular
        .module('app') 
       .controller("ProfileController", ProfileController);

    ProfileController.$inject = ['$scope', 'userFactory', '$location'];

    function ProfileController($scope, userFactory, $location) {
        $scope.error;
    }

})();
