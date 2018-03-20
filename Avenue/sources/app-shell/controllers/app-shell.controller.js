(function () {
    'use strict';

    function Controller($rootScope, $scope, $state, appShellService) {

        // private variables
        var self = this;
        self.designers = [];
        self.user = appShellService.getUserObj();
        self.shellProperties = appShellService.getProperties();

        //event listeners
        $scope.$on('login', function () {
            self.user = appShellService.getUserObj();
        });
        $scope.$on('logout', function () {
            self.user = appShellService.getUserObj();
        });
        $scope.$on('shellPropChange', function () {
            self.shellProperties = appShellService.getProperties();
        });

        appShellService.getAllDesigners().then(function (result) {
            for (var i = 0; i < result.length; i++) {
                self.designers[i] = result[i];
            }
        });

        function logOut() {
            appShellService.logOutUser().then(function () {
                $state.go('root.home');
            });
        }

        //function updateCookies() {
        //    appShellService.updateCookies();
        //}

        // public functions
        self.logOut = logOut;
        //self.updateCookies = updateCookies;
        // invocation logic

    }

    angular
        .module('appShell')
        .controller('appShellController', Controller);

})();
