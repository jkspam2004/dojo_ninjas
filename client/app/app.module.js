(function() {
    'use strict';

    angular
        .module('app', [
             'ngRoute', 
             'ngMessages',
             'naif.base64'
        ])
        .run(['$window', '$rootScope', '$location', '$log', 'authFactory', watch]);

    /* listener to watch route changes */
    function watch ($window, $rootScope, $location, $log, authFactory) {
        $rootScope.$on('$routeChangeStart', checkLogin);

        function checkLogin(event, next, current) {
            // no logged user, we should be going to #login if requireLogin set on route
            if (authFactory && authFactory.isLoggedIn()) {
                console.log("app.module - we are logged in");
            } else {
                if (next.requireLogin) {
                    console.log("app.module - require Login");
                    $location.path('/login');
                } else {
                    console.log("app.module - does not require Login");
                }
            }
        }
    }

})();
