app.controller("newCommentController", ['$scope', 'ninjaFactory', 'topicFactory','$location', '$routeParams', function($scope, ninjaFactory,topicFactory, $location, $routeParams) {
  console.log("newCommentController");

  $scope.topic = {};
  $scope.topicid = $routeParams.id;

  ninjaFactory.getNinjaSelf(function(returned_data) {
    $scope.ninja_self = returned_data;
  });
  if (!$scope.ninja_self.email) { // redirect to login page if no user
    $location.path('/');
  }

  /* get info for specific topic */
  topicFactory.show($scope.topicid, function(returned_data) {
    console.log("topics returned", returned_data);
    if (returned_data.status) {
      $scope.topic = returned_data.result;
      console.log($scope.topic);
    } else {
      console.log("error getting topics", returned_data.result);
    }
  }); 

  $scope.cancelComment = function() {
    $scope.newComment = {};
  };

  $scope.addComment = function() {
    $scope.newComment.userid = $scope.ninja_self._id; // get the logged in user who is posting topic
    $scope.newComment._id = $scope.topicid;

    console.log("newComment:", $scope.newComment);
    topicFactory.addComment($scope.newComment, function(returned_data) {
      if (returned_data.status) {
        console.log("successful add");

        $scope.newComment = {}; // reset text boxes
        $location.path('/dashboard'); // load the root path partial
      } else {
        $scope.error = returned_data.result; 
        console.log("error adding", returned_data.result);
      }
    });
  };

}]);

