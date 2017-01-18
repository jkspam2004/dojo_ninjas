app.controller("showTopicController", ['$scope', 'ninjaFactory', 'topicFactory','$location', '$routeParams', function($scope, ninjaFactory,topicFactory, $location, $routeParams) {
  console.log("showTopicController");

  $scope.topic = {};
  $scope.topicid = $routeParams.id;

  ninjaFactory.getNinjaSelf(function(returned_data) {
    $scope.ninja_self = returned_data;
  });
  if (!$scope.ninja_self.email) {
    $location.path('/');
  }

  /* get info for specific topic */
  var show = function() {
    topicFactory.show($scope.topicid, function(returned_data) {
      console.log("topics returned", returned_data);
      if (returned_data.status) {
        $scope.topic = returned_data.result;
        console.log($scope.topic);
      } else {
        console.log("error getting topics", returned_data.result);
      }
    }); 
  }
  show();

  /* add like and pass show() as the callback */
  $scope.addLike = function(val) {
    console.log("comment", val);
    var comment = { _id: val, userid: $scope.ninja_self._id };
    topicFactory.addLike(comment, show);
  }


}]);

