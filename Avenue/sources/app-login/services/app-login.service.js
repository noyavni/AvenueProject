(function () {
    'use strict';

    angular.module('appLogin').service('appLoginService', function ($http, $q) {

        // private variables
        var self = this;


        //private functions
        function getAllUsers(username, pass) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/loginVerification"
            var data = { userName: username, password: pass };


            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data[0]) {
                    deferred.resolve(result.data[0]);
                } else {
                    deferred.reject("no users");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        // public assignments
        self.getAllUsers = getAllUsers;



    });
})();