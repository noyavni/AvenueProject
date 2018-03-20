(function () {
    'use strict';

    angular.module('appAddProduct').service('appAddProductService', function ($rootScope, $http, $q) {

        // private variables
        var self = this;

        //private functions
        function getAllPTypes() {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getAllCategoriesFromDB"
            $http.post(servicePath).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject("no product types");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;

        }

        function getAllBShapes() {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getAllProductShapesFromDB"
            $http.post(servicePath).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject("no shapes");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }


        function insertNewCategory(categoryName, img) {
            var deferred = $q.defer();
            var servicePath ="/NApp/Sources/fakeServer/WebService.asmx/insertNewCategotry";
            var data = { categoryName: categoryName, img: img };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject("no shapes");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        //function setProduct(listProduct) {
        //    var deferred = $q.defer();
        //    var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/insertNewProduct"
        //    var data = listProduct;

        //    $http.post(servicePath, JSON.stringify(data)).then(function (result) {
        //        if (result.data) {
        //            deferred.resolve(result.data);
        //        } else {
        //            deferred.reject("no product");
        //        }
        //    }, function (reason) {
        //        deferred.reject("error" + reason);
        //    });

        //    return deferred.promise;
        //}

        //public assignments
        
        self.getAllBShapes = getAllBShapes;
        self.getAllPTypes = getAllPTypes;
        //self.setProduct = setProduct;
        
        
    });
})();