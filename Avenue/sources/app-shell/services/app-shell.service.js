(function () {
    'use strict';

    angular.module('appShell').service('appShellService',
                function ($rootScope, $http, $q, $cookies, localStorageService, $mdDialog) {

        // private variables       
        var self = this;
        self.Cart = [];
        //self.Cart = $cookies.getObject('cartObj');
        self.user = $cookies.getObject('userObj');

        self.properties = {
            userNavBar: false,
            addProduct: false,
            addNewCategory: false,
            orders: false,
            addreview: false
        };

        //private functions
        function setUser(obj) {
            self.user = obj;
            $cookies.putObject('userObj', self.user);
            localStorageService.set('cartObj', self.Cart);
            self.properties.userNavBar = true;
            self.properties.addreview = true;

            $rootScope.$broadcast('login');
            $rootScope.$broadcast('shellPropChange');
        }

        //function updateCookies() {
        //    $cookies.putObject('cartObj', self.Cart);
        //}

        function addtocart(item) {          
            self.Cart.push(item);
            return localStorageService.set('cartObj', self.Cart);
        }

        function removeItem(index) {
            self.Cart = localStorageService.get('cartObj');
            self.Cart.splice(index, 1);
            localStorageService.set('cartObj', self.Cart);
        }

        function clearCart() {
            self.Cart = [];
            localStorageService.set('cartObj', self.Cart);
            
        }

        function getCart() {
            //return $cookies.getObjet('cartObj');
            self.Cart = localStorageService.get('cartObj');
           return self.Cart;
        }

        /* add function self.user = null */
        function logOutUser() {
            var deferred = $q.defer();
            self.user = null;
            $cookies.remove('userObj');
            localStorageService.remove('cartObj');
            self.properties.userNavBar = false;
            self.properties.addProduct = false;
            self.properties.addNewCategory = false;
            self.properties.orders = false;
            self.properties.addreview = false;

            $rootScope.$broadcast('logout');
            $rootScope.$broadcast('shellPropChange');

            deferred.resolve(true);
            return deferred.promise;
        }

        function addLike(userName, prodName) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/addLike";
            var data = { userName: userName, prodName: prodName };

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

        function getUserFName() {
            return self.user.Fname;
        }

        function getUserName() {
            return self.user.UserName;
        }

        function getUserObj() {
            return self.user;
        }


        function getAllDesigners() {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getAllDesignersFromDB"

            $http.post(servicePath).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        function setProperties(key,value) {
            self.properties[key] = value;
        }

        function getProperties() {
            if (self.user != undefined){
                if (self.user.UserName == 'admin') {
                    self.properties.addProduct = true;
                    self.properties.addNewCategory = true;
                    self.properties.orders = true;
                    self.properties.addreview = true;
                }
                if (self.user.UserName != null)
                    self.properties.userNavBar = true;
                    self.properties.addreview = true;
            }
            return self.properties;
        }

        function getProperty(key) {
            return self.properties[key];
        }

        function Alert(msg, cont, ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(msg)
                .textContent(cont)
                //.ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
        }

        // public assignments
        self.getAllDesigners = getAllDesigners;
        self.setUser = setUser;
        self.logOutUser = logOutUser;
        self.getUserObj = getUserObj;
        self.getUserFName = getUserFName;
        self.getUserName = getUserName;
        self.setProperties = setProperties;
        self.getProperties = getProperties;
        self.getProperty = getProperty;
        self.addtocart = addtocart;
        self.getCart = getCart;
        self.removeItem = removeItem;
        self.addLike = addLike;
        self.clearCart = clearCart;
        self.Alert = Alert;
        //self.updateCookies = updateCookies;



    });
})();