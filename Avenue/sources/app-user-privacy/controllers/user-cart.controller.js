(function () {
    'use strict';

    function Controller($scope, $rootScope, $state, appShellService, appUserPrivacyService) {

        // private variables
        var self = this;
        $scope.bshow = true;
        self.address = { street: self.street, city: self.city, postcode: self.postcode, phone: self.tel };            
        self.userDetails = appShellService.getUserObj();
        self.Cart = appShellService.getCart();
        self.street = self.userDetails.Street;
        self.city = self.userDetails.City;
        self.prods = [];

        $scope.confirmPay = function (ev) {
            var msg;
            var cont;
            if (self.Cart.length > 0)
            {
                for (var i = 0; i < self.Cart.length; i++) {
                    self.prods.push(self.Cart[i].prodName);
                }

                if (self.creditNumber == '' || self.creditNumber == undefined || self.exDate == '' || self.exDate == undefined ||
                        self.owner == '' || self.owner == undefined || self.cvv == '' || self.cvv == undefined)
                    {
                        msg = "Error ";
                        cont = "Invalid Credit Card Details";
                        appShellService.Alert(msg, cont, ev);
                }
                else
                {
                    var date = new Date();
                    var curMonth = date.getMonth() + 1;
                    var curYear = date.getFullYear();
                    var chosenMonth = self.exDate.getMonth() + 1;
                    var chosenYear = self.exDate.getFullYear();
                    if (chosenYear < curYear || (chosenMonth < curMonth && chosenYear == curYear))
                    {
                        msg = "Error Credit Card Date";
                        cont = "Invalid Credit Card Date Try Again";
                        appShellService.Alert(msg, cont, ev);
                    }
                    else
                    {
                        appUserPrivacyService.insertOrder(self.userDetails.UserName, $scope.totalPrice).then(function (result) {
                            if (result == 1) {
                                appUserPrivacyService.insertProdsToOrder(self.prods).then(function (res) {
                                    if (res == 1) {
                                        msg = "Thank You For Buying";
                                        cont = "One Of Our Guys Will Contact You";
                                        appShellService.clearCart();
                                        $state.reload(true);
                                        appShellService.Alert(msg, cont, ev);
                                    } else {
                                        msg = "ERROR";
                                        cont = "Please Try Again Later";
                                        appShellService.Alert(msg, cont, ev);
                                    }
                                })
                            }
                        })
                    }
                }
              
            }
            else {
                msg = "Alert";
                cont = "Your Cart is Empty, Please choose At Least One Product";
                appShellService.Alert(msg, cont, ev);
                $state.go("root.collection.categories");
            }
            
        }

        $scope.edit = function () {

        }

        $scope.deleteItem = function (index) {
            appShellService.removeItem(index);
            self.Cart = appShellService.getCart();
            $scope.calcTotal();
        }

        $scope.calcTotal = function () {
            $scope.totalPrice = 0;
            $scope.shipment = 25;
            $scope.Price = 0;
            if (self.Cart != null)
            {
                for (var i = 0; i < self.Cart.length; i++) {
                    var item = parseInt(self.Cart[i].price);
                    $scope.Price += item;
                }
            }            
            $scope.totalPrice = $scope.Price + $scope.shipment;
        }

        $scope.pay = function () {
            $scope.bshow = false;
            $scope.showPay = true;
        }
    }

    angular
    .module('appUserPrivacy')
    .controller('cartController', Controller);
    })();


  