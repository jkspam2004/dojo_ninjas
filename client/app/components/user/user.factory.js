(function() {
    'use strict';

    angular
        .module('app')
        .factory('userFactory', userFactory);
    
    userFactory.$inject = ['$http'];

    function userFactory($http) {
   

      /* constructor for our factory */
      var ninja_self = {};
      var ninjas = [];
      function ninjaFactory() {
        var _this = this;

        /* index method: get all ninjas
           make http request to server side: routes -> controller
           controller returns json in the form of {data: { result: Object, status: Boolean }}
        */
        this.getNinjas = function(campus, callback) {
          $http.get('/ninjas/' + campus + '/campus').then(function(returned_data) {
            console.log("getNinjas", returned_data);
            ninjas = returned_data.data.result; 
            if (typeof(callback) == 'function') {
              callback(returned_data.data);
            }
          });
        };

        /* get ninja by id */
        this.getById = function(id, callback) {
          $http.get('/ninjas/' + id + '/id').then(function(returned_data) {
            console.log("factory.get return data", returned_data.data);
            if (returned_data.data.status) {
              ninja_self = returned_data.data.result;
            }
            if (typeof(callback) == 'function') {
              callback(returned_data.data);
            }
          });
        };
        /* get ninja by email */
        this.getByEmail = function(id, callback) {
          $http.get('/ninjas/' + id + '/email').then(function(returned_data) {
            console.log("factory.get return data", returned_data.data);
            if (returned_data.data.status) {
              ninja_self = returned_data.data.result;
            }
            if (typeof(callback) == 'function') {
              callback(returned_data.data);
            }
          });
        };
        /* get ninja from factory, not db */
        this.getNinjaSelf = function(callback) {
          if (typeof(callback) == 'function') {
            console.log("getNinja", ninja_self);
            callback(ninja_self);
          }
        };
        /* reset the cache for ninja_self*/
        this.resetCache = function() {
          ninja_self = {};
        }
        /* check login */
        this.login = function(data, callback) {
          console.log("factory login data", data);
          $http.post('/ninjas/' + data.email + '/login', data).then(function(returned_data) {
            if (returned_data.data.status) {
              ninja_self = returned_data.data.result;
            }
            if (typeof(callback) == 'function') {
              callback(returned_data.data);
            }
          });
        }
        /* create a new ninja */
        this.create = function(newNinja, callback) {
          console.log("ninjafactory.create", newNinja);
          $http.post('/ninjas', newNinja).then(function(returned_data) {
            console.log("factory.create return data", returned_data.data);
            if (returned_data.data.status) {
              ninja_self = returned_data.data.result;
            }
            if (typeof(callback) == 'function') {
              callback(returned_data.data);
            }
          });
        };
        /* update method: update self */
        this.updateProfile = function(updateNinja, callback) {
          console.log("factory.update input", updateNinja);
          $http.put('/ninjas/' + updateNinja._id, updateNinja).then(function(returned_data) {
            if (returned_data.data.result.status) {
              ninja_self = returned_data.data.result;
            }
            console.log("factory.update return data", returned_data);
            if (typeof(callback) == 'function') {
              callback(returned_data.data);
            }
          });
        };

      };
      return new ninjaFactory();
    }


})();
