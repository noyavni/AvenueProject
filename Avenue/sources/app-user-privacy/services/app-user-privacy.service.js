(function () {
    'use strict';

    angular.module('appUserPrivacy').service('appUserPrivacyService', function ($rootScope, $http, $q) {

        // private variables
        var self = this;

        //private functions
        function getOrdersByUserName(userName) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getOrdersByUserName";
            var data = { userName: userName };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function updateBodyShape(changeObj) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/calcBodyShapeAlgorithem";
            var data = { shoulders: changeObj.shoulders, bust: changeObj.bust, waist: changeObj.waist, hips: changeObj.hips };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function updateUserbShape(userName, bShape) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/updateUserBShape";
            var data = { userName: userName, bShape: bShape };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function updateUserAddress(userName, addressObj) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/updateUserDetails";
            var data = {userName: userName, phone: addressObj.phone, city: addressObj.city,
                        street: addressObj.street, postcode: addressObj.postcode};

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function getLikesByUserName(userName) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getUserLikes";
            var data = { userName: userName };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject("no likes");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function deleteFromLike(username, item) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/deleteLikes";
            var data = { userName: username, prodName: item };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject("no likes");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function getOrdersByNum(orderNum, index) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getProdsByOrderNum";
            var data = { orderNum: orderNum };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    result.data.index = index;
                    deferred.resolve(result.data);
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function insertOrder(userName, totalPrice) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/insertNewOrder";
            var data = { userName: userName, totalPrice: totalPrice };

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


        function insertProdsToOrder(prods) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/insertProductsToOrder";
            var data = { prods: prods };

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
        self.getLikesByUserName = getLikesByUserName;
        self.getOrdersByUserName = getOrdersByUserName;
        self.getOrdersByNum = getOrdersByNum;
        self.deleteFromLike = deleteFromLike;
        self.updateBodyShape = updateBodyShape;
        self.updateUserbShape = updateUserbShape;
        self.updateUserAddress = updateUserAddress;
        self.insertOrder = insertOrder;
        self.insertProdsToOrder = insertProdsToOrder;
    });
})();