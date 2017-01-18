(function() {
    'use strict';

    angular.module('app')
        .config(configBlock);

    configBlock.$inject = ['$routeProvider', '$locationProvider'];

    function configBlock($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix(''); // removes extra ! in the url

        $routeProvider
            // main
            .when('/', { 
                controller: 'LandingController',
                templateUrl: 'app/components/landing/landing.html',
                controllerAs: 'vm',
                requireLogin: false 
            })
            // login page
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'app/components/auth/login.html',
                controllerAs: 'vm',
                requireLogin: false 
            })
            // registration page
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'app/components/auth/register.html',
                controllerAs: 'vm',
                requireLogin: false 
            })
            // logout and redirect to login page
            .when('/logout', { 
                controller: 'LogoutController',
                templateUrl: 'app/components/auth/login.html',
                controllerAs: 'vm',
                requireLogin: true 
            })
            // events page
            .when('/events', {
                controller: 'EventController',
                templateUrl: 'app/components/event/event.html',
                requireLogin: true 
            })
            // chatroom
            .when('/chatroom', {
                controller: 'ChatController',
                templateUrl: 'app/components/chat/chat.html',
                requireLogin: true 
            })
            // profile page
            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'app/components/user/profile.html',
                requireLogin: true 
            })
            // display all users
            .when('/ninjadex', {
                controller: 'NinjadexController',
                templateUrl: 'app/components/user/ninjadex.html',
                requireLogin: true 
            })
            // display page to edit a user
            .when('/ninjas/:id/edit', {
                controller: 'EditUserController',
                templateUrl: 'app/components/user/editUser.html',
                requireLogin: true 
            })
            // discussion
            .when('/dashboard', {
                controller: 'DashboardController',
                templateUrl: 'app/components/discussion/dashboard.html',
            })
            // add topic
            .when('/topics/new', {
                controller: 'newTopicController',
                templateUrl: 'app/components/discussions/new_topic.html',
                requireLogin: true 
            })
            // add comment
            .when('/topics/:id/new_comment', {
                controller: 'newCommentController',
                templateUrl: 'app/components/discussions/new_comment.html',
                requireLogin: true 
            })
            // show a topic
            .when('/topics/:id', {
                controller: 'showTopicController',
                templateUrl: 'app/components/discussions/show_topic.html',
                requireLogin: true 
            })
            // gallery
            .when('/gallery', {
                controller: 'galleryController',
                templateUrl: 'app/components/gallery/gallery.html',
                requireLogin: true 
            })
            .otherwise({
                redirectTo: '/'
            });

    }
})();
