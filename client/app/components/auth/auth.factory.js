/* auth.factory.js */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('authFactory', authFactory);
    
    authFactory.$inject = ['$http', '$log', '$window'];

    function authFactory($http, $log, $window) {
        var currentUser = $window.localStorage;

        var service = {
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            register: register
        };
        return service;

        // login 
        function login(newLogin, callback) {
            console.log("authFactory login data", newLogin);
            $http.post('/ninjas/' + newLogin.email + '/login', newLogin).then(loginCallback);
            function loginCallback(response) {
                if (response.data && response.data.success) {
                    delete response.data.result.password;
                    $window.localStorage.setItem("currentUserId", response.data.result._id);
                    $window.localStorage.setItem("currentUserEmail", response.data.result.email);
                    currentUser = $window.localStorage;
                } else {
                    $log.error("authFactory - error login", response.data.message);
                }

                if (typeof(callback) == 'function') {
                    callback(response.data);
                }
            }
        }
        // logout 
        function logout(callback) {
            console.log("authFactory.logout - logging out user");
            $window.localStorage.clear();
            console.log("logout localStorage", $window.localStorage);
            currentUser = null;
            if (typeof(callback) == 'function') {
                callback();
            }
        }
        // isLoggedIn
        function isLoggedIn() {
            $log.debug("factory currentUser", currentUser);
            return (currentUser && currentUser.currentUserId) ? currentUser : false;
        };
        // register
        function register() {
        };

    }

})();
