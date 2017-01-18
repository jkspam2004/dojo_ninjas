(function() {
    'use strict';

    console.log("topics factory");
    angular
        .module('app')
        .factory('topicFactory', topicFactory)

    topicFactory.$inject = ['$http'];

    function topicFactory($http) {
        var service = {
            get: get,
            create: create,
            show: show,
            addComment: addComment,
            addLike: addLike 
        };
        return service;

        /* get all the topics for display */
        function get(callback) {
            $http.get('/topics').then(function(returned_data) {
                console.log("topicFactory.get return data", returned_data.data);
                if (typeof(callback) == 'function') {
                    callback(returned_data.data);
                }
            });
        }

        /* create a new topic */
        function create(newQuestion, callback) {
            $http.post('/topics', newQuestion).then(function(returned_data) {
                console.log("factory.create return data", returned_data.data);
                if (typeof(callback) == 'function') {
                    callback(returned_data.data);
                }
            });
        }

        /* get data for a specific topic */
        function show(topicid, callback) {
            $http.get('/topics/' + topicid).then(function(returned_data) {
                console.log("factory.show return data", returned_data.data);
                if (typeof(callback) == 'function') {
                    callback(returned_data.data);
                }
            });
        }

        /* add an comment to a topic */
        function addComment(newComment, callback) {
            $http.post('/comments', newComment).then(function(returned_data) {
                console.log("factory.addComment return data", returned_data.data);
                if (typeof(callback) == 'function') {
                    callback(returned_data.data);
                }
            });
        }

        /* add a like to an comment */
        function addLike(comment, callback) {
            $http.post('/comments/' + comment._id, comment).then(function(returned_data) {
                console.log("factory.addComment return data", returned_data.data);
                if (typeof(callback) == 'function') {
                    callback(returned_data.data);
                }
            });
        }
    }
})();
