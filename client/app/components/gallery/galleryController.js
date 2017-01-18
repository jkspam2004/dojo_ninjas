app.controller("galleryController", ['$scope', 'ninjaFactory', 'galleryFactory','$location', function($scope, ninjaFactory, galleryFactory, $location) {
  console.log("galleryController");
  $scope.topics = [];

  ninjaFactory.getNinjaSelf(function(returned_data) {
    $scope.ninja_self = returned_data;
  });
  if (!$scope.ninja_self.email) {
    $location.path('/');
  }

  galleryFactory.get(function(returned_data) {
    console.log("topics returned", returned_data);
    if (returned_data.status) {
      $scope.topics = returned_data.result;
    } else {
      console.log("error getting topics", returned_data.result);
    }
  }); 


}]);
