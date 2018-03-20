(function () {
    'use strict';

    angular.module('appCollection').service('appCollectionService', function ($rootScope, $http, $q) {

        // private variables
        var self = this;

        //private functions
        function getCategoriesImg(category) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getProducts";
            var data = { categoryName: category };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } 
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function getAllCategories() {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getCategory";

            $http.post(servicePath).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function insertNewCategory(formdata) {
            var deferred = $q.defer();
            var data = formdata;
            var imageName = $.ajax({
                url: "/NApp/Sources/fakeServer/WebService.asmx/insertNewCategotry",
                type: "POST",
                contentType: false,
                processData: false,
                data: data,
                async: true
            }).responseText

            return imageName;
        }


        // public assignments
        self.getAllCategories = getAllCategories;
        self.insertNewCategory = insertNewCategory;

    });
})();