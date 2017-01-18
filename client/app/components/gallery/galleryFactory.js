console.log("gallery factory");

app.factory('galleryFactory', ['$http', function($http) {
  function galleryFactory() {
    var _this = this;

    /* get all the gallerys for display */
    this.get = function(callback) {
      $http.get('/gallery').then(function(returned_data) {
        console.log("galleryFactory.get return data", returned_data.data);
        if (typeof(callback) == 'function') {
          callback(returned_data.data);
        }
      });
    };

    /* create a new gallery */
    this.create = function(newQuestion, callback) {
      $http.post('/gallery', newQuestion).then(function(returned_data) {
        console.log("factory.create return data", returned_data.data);
        if (typeof(callback) == 'function') {
          callback(returned_data.data);
        }
      });
    };

  }
  console.log(new galleryFactory());
  return new galleryFactory();
  

}]);


