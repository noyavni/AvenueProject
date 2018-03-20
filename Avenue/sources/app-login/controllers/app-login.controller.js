(function () {
    'use strict';

    function Controller($scope, $rootScope, $state, appLoginService, appShellService) {

        // private variables
        var self = this;
        self.errorMsg = null;

        /*FOR DEV - TO REMARK */
        //self.userName = "noyavni";
        //self.pass = "1234"


        self.verifyUser = function () {
            self.errorMsg = null;
            appLoginService.getAllUsers(self.userName, self.pass).then(function (result) {
                appShellService.setUser(result);
                $state.go('root.home');

            }, function (error) {
                self.userName = null;
                self.pass = null;
                if (error === 'no users') {
                    self.errorMsg = 'Invalid User Name or Password';//$translate.inset('')
                } 
                
            });

        }

        self.verifyUser();
    }

    angular
    .module('appLogin')
    .controller('appLoginController', Controller);
    })();


  