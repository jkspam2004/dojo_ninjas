(function() {
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$location', '$log', '$window', 'authFactory'];

    function HeaderController($scope, $location, $log, $window, authFactory) {
        var vm = this;
        vm.currentUser = null;

        $scope.$on('$locationChangeSuccess', function() {
            var path = $location.path();

            // set the currentUser scope to display user logged in
            vm.currentUser = { 
                email: $window.localStorage.getItem('currentUserEmail'),
                id: $window.localStorage.getItem('currentUserId')
            };

            //$scope.templateUrl = (path === '/login' || path === '/register') ? 'app/components/core/header/headerSignin.html' : 'app/components/core/header/header.html';
            vm.templateUrl = (!authFactory.isLoggedIn()) ? 'app/components/core/header/headerSignin.html' : 'app/components/core/header/header.html';
        });

    }
})();
