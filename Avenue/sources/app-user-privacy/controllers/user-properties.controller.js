(function () {
    'use strict';

    function Controller($scope, $rootScope, $state, appShellService, appUserPrivacyService) {

        // private variables
        var self = this;
        self.user = appShellService.getUserObj();
        var ordersHistoryArr = [];
        self.ordersHistoryObj = [];
        self.showDiv = [];
        self.changeObj = { shoulders: '', bust: '', waist: '', hips: '' };
        self.addressObj = { phone: self.user.Phone, city: self.user.City, street: self.user.Street, postcode: self.user.PostCode };
        var newbShape;

        function rowClicked(index) {
            if (self.showDiv === index) {
                self.showDiv = null;
            } else {
                self.showDiv = index;
            }
        }

        appUserPrivacyService.getOrdersByUserName(self.user.UserName).then(function (result) {
           
            for (var i = 0; i < result.length ; i++) {
                ordersHistoryArr.push(result[i]);
            }       
            self.ordersHistoryObj = ordersHistoryArr;
            for (var j = 0; j < self.ordersHistoryObj.length; j++) {
                var orderNum = self.ordersHistoryObj[j].OrderNum;
                appUserPrivacyService.getOrdersByNum(orderNum, j).then(function (result) {
                    self.ordersHistoryObj[result.index].items = result;
                });
            }
        });

        self.updateBodyShape = function () {
            appUserPrivacyService.updateBodyShape(self.changeObj).then(function (result) {
                newbShape = result.d;
                appUserPrivacyService.updateUserbShape(self.user.UserName, result.d).then(function (res) {
                    if(res == 1)
                    {
                        self.user.UserBodyShape = newbShape;
                        appShellService.setUser(self.user);
                    }
                })
            })
        }

        self.updateUserAddress = function () {
            appUserPrivacyService.updateUserAddress(self.user.UserName, self.addressObj).then(function (result) {
                if (result == 1) {
                    self.user.Phone = self.addressObj.phone;
                    self.user.Street = self.addressObj.street;
                    self.user.City = self.addressObj.city;
                    self.user.PoseCode = self.addressObj.postcode;

                    appShellService.setUser(self.user);
                    $state.reload(true);
                }
            })
        }

        //public function
        self.rowClicked = rowClicked;

    }

    angular
    .module('appUserPrivacy')
    .controller('propertiesController', Controller);
    })();


  