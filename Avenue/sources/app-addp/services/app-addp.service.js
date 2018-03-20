(function () {
    'use strict';

    angular.module('appAddP').service('appAddPService', function ($rootScope, $http, $q) {

        /* private variables */
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

        function getAllDesigners() {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getAllDesignersFromDB"
            $http.post(servicePath).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject("no designers");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function setProduct(formdata) {
            var deferred = $q.defer();
            var data = formdata;
            var imageName = $.ajax({
                url: "/NApp/Sources/fakeServer/WebService.asmx/setProductImages",
                type: "POST",
                contentType: false,
                processData: false,
                data: data,
                async: false
            }).responseText
            
            return imageName;
        }

        //public assignments
        self.getAllBShapes = getAllBShapes;
        self.getAllPTypes = getAllPTypes;
        self.setProduct = setProduct;
        self.getAllDesigners = getAllDesigners;
        
        
    });
})();