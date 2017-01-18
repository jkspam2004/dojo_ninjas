(function() {
    'use strict';

    angular
        .module('app')
        .controller("NinjadexController", NinjadexController);

    NinjadexController.$inject = ['$scope', 'userFactory', '$location'];

    function NinjadexController($scope, userFactory, $location) {

        console.log("client ninjaDexController");

        $scope.ninja_self = {};
        $scope.ninjas = [];
        $scope.error;
        $scope.cohorts = [];

        var unique = {};
        userFactory.getNinjas($scope.ninja_self.campus, function(returned_data) {
            console.log("getNinjas client controller", returned_data);
            if (returned_data.status) {
                $scope.ninjas = returned_data.result;

                /* group by cohorts. we could have queried for all ninjas when cohort clicked instead of getting all the data up front */
                // TODO: this logic should probably go into the factory to keep the controller skinny
                for (var i=0; i<$scope.ninjas.length; i++) {
                    if (!$scope.cohorts.length) {
                        $scope.cohorts = [ { cohort: $scope.ninjas[i].cohort, ninjas: [$scope.ninjas[i]], index: i, show: false }];
                        unique[$scope.ninjas[i].cohort] = i;
                    } else {
                        if (unique[$scope.ninjas[i].cohort]) {
                            var index = unique[$scope.ninjas[i].cohort]; 
                            $scope.cohorts[index].ninjas.push($scope.ninjas[i]); // we already stored the cohort; push ninjas to ninjas key
                        } else {
                            $scope.cohorts.push({ cohort: $scope.ninjas[i].cohort, index: i, show: false });
                            if (!$scope.cohorts[i].ninjas) {
                                $scope.cohorts[i].ninjas = [($scope.ninjas[i])]; 
                            } else {
                                $scope.cohorts[i].ninjas.push($scope.ninjas[i]); 
                            }
                            unique[$scope.ninjas[i].cohort] = i;
                        }
                    }
                }
                console.log($scope.cohorts);
            } else {
                $scope.error = returned_data.result;
                console.log("something went wrong", returned_data.result);
            }
        });

        /* expand to display all ninjas of a cohort */
        $scope.expand = function(cohort) {
            cohort.show = !cohort.show;
        }

        /* show a selected ninja */
        $scope.showNinja = function(ninja) {
            $scope.ninja = ninja;
            $scope.ninja.show = !$scope.ninja.show;
            console.log($scope.ninja);
        }
    }

})();
