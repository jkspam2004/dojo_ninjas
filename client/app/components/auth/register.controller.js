(function() {
    'use strict';

    angular
        .module('app')
        .controller("RegisterController", RegisterController);

    RegisterController.$inject = ['$scope', 'userFactory', '$location'];

    function RegisterController($scope, userFactory, $location) {
        var vm = this;
        vm.error = null;
        vm.register = register;

        /* register(): user registration */
        function register() { 
            if (!vm.email) { // check to see if email exists first. has to be defined
                console.log("email is blank");
                vm.error = { message: "Registration error", errors: ["Email cannot be blank"] };
            } else { // find user by email
                userFactory.getByEmail(vm.email, function(returned_data) {
                    console.log("registerController data", returned_data);
                    if (returned_data.success) {
                        if (returned_data.result) { 
                            // user already in system
                            console.log("found user", returned_data.result.first_name);
                            vm.error = { message: "Registration error", errors: [{ message: "Email already in use" }] };
                        } else {
                            // add the ninja if not already in our system
                            console.log("add user", vm);
                            userFactory.create(vm, function(returned_data) {
                                console.log("added ninja return", returned_data);
                                if ( returned_data.success ) {
                                    $location.url('/events');
                                } else {
                                    vm.error = returned_data.result;
                                    console.log("error adding ninja", returned_data.result);
                                    vm = {};
                                }
                          });
                        }
                    } else {
                        console.log("something wrong ninjaFactory.getByEmail", returned_data.result);
                    }
                }); // end userFactory.getByEmail
            }
        };
    } // function RegisterController

})();
