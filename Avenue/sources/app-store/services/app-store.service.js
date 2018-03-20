(function () {
    'use strict';

    angular.module('appStore').service('appStoreService', function ($rootScope, $http, $q) {

        // private variables
        var self = this;

        //private functions
        function getAllProducts(category) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getProductsByCategory";
            var data = {category: category };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
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

      

        function getfits(bShape) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getFits";
            var data = { bShape: bShape };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
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
        self.getAllProducts = getAllProducts;
        self.getfits = getfits;


    });
})();