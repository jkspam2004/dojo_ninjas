app.controller("newTopicController", ['$scope', 'ninjaFactory', 'topicFactory','$location', function($scope, ninjaFactory,topicFactory, $location) {
  console.log("newTopicController");
  $scope.topics = [];

  ninjaFactory.getNinjaSelf(function(returned_data) {
    $scope.ninja_self = returned_data;
  });
  if (!$scope.ninja_self.email) {
    $location.path('/');
  }

  $scope.addTopic = function() {
    $scope.newTopic.userid = $scope.ninja_self._id; // get the logged in user who is posting topics

    topicFactory.create($scope.newTopic, function(returned_data) {
      if (returned_data.status) {
        console.log("successful add");

        $scope.newTopic = {}; // reset text boxes
        $location.path('/dashboard'); // load the root path partial
      } else {
        $scope.error = returned_data.result; 
        console.log("error adding", returned_data.result);
      }
    });
  };


}]);

