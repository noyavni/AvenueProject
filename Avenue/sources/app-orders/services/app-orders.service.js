(function () {
    'use strict';

    angular.module('appOrders').service('appOrdersService', function ($rootScope, $http, $q) {

        // private variables
        var self = this;

        //private functions
        function getOrders() {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getAllOrders";
            //var data = {};

            $http.post(servicePath).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject("no products");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }



        // public assignments
        self.getOrders = getOrders;


    });
})();