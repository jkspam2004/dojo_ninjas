(function() {
    'use strict';

    angular
        .module('app')
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ['$scope', 'userFactory', 'topicFactory','$location'];

    function DashboardController($scope, userFactory, topicFactory, $location) {
        console.log("dashboardController");
        $scope.topics = [];

        topicFactory.get(function(returned_data) {
            console.log("topics returned", returned_data);
            if (returned_data.status) {
                $scope.topics = returned_data.result;
            } else {
                console.log("error getting topics", returned_data.result);
            }
        }); 
    }
})();
