(function () {
    'use strict';

    function Controller($scope, $rootScope, $state, appShellService, appUserPrivacyService, appStoreService, $window) {

        // private variables
        var self = this;
        self.list = [{ prodName: '', image: [], price: '', bShape: '', imgRange: [], match: '' }];
        self.prodList = [];
        var counter = 1;
        var i = 0;
        self.userDetails = appShellService.getUserObj();
        //$scope.$emit("CallParentMethod", {});
   
        if (self.userDetails == null)
            self.list[0].match = "./assets/img/grey-filled-circle.svg";

        else {
            appStoreService.getfits(self.userDetails.UserBodyShape).then(function (result) {
                self.res = result;
            })
        }
        self.alg = function (Pshape) {
            for (var i = 0 ; i < self.res.length ; i++)
                if (self.res[i].PShape == Pshape)
                    var res = self.res[i].match;
            switch (res) {
                case "1": self.list[0].match = "./assets/img/red-filled-circle.svg";
                    break;
                case "2": self.list[0].match = "./assets/img/yellow-filled-circle.svg";
                    break;
                case "3": self.list[0].match = "./assets/img/green-filled-circle.svg";
                    break;
                default: self.list[0].match = "./assets/img/grey-filled-circle.svg";
            }
        }
              

        $scope.addToCart = function (item, ev) {
            var msg = '';
            var cont = '';
            var check = appShellService.addtocart(item);
            if (check == true) {
                msg = 'Success';
                cont = 'The Product Added To Your Cart';
            }
            else {
                msg = 'Failed';
                cont = 'Sorry! Unexpected Error';
            }
            appShellService.Alert(msg, cont, ev);

        };
        
        //$scope.$on("CallParentMethod", function () {
        //    self.getLikes();
        //});
     

        $scope.deleteItem = function (item) {
            appUserPrivacyService.deleteFromLike(self.userDetails.UserName, item.prodName).then(function (result) {
                $state.reload(true);
                //self.getLikes;
            })
        };

        appUserPrivacyService.getLikesByUserName(self.userDetails.UserName).then(function (result) {
                while (i < result.length) {
                    //imgNum = 0;
                    self.list[0].prodName = result[i].prod[0];
                    self.list[0].image[0] = result[i].prod[1];
                    self.list[0].price = result[i].prod[2];
                    self.list[0].bShape = result[i].prod[3];
                    //self.list[0].imgRange.push(imgNum);
                    if (counter < result.length) {
                        while (result[counter].prod[0] == self.list[0].prodName) {
                            self.list[0].image.push(result[counter].prod[1]);
                            counter++;
                            if (counter == result.length) break;
                        }

                    }
                    self.alg(self.list[0].bShape);
                    self.prodList.push(self.list[0]);

                    self.list = [{ prodName: '', image: [], price: '', bShape: '', imgRange: [], match: '' }];
                    //if (counter < result.length) {
                    i = counter;
                    counter++;
                    //loc++;
                    //}
                    //else i++;
                    if (i == result.length) break;
                }
            })
 
    }

    angular
    .module('appUserPrivacy')
    .controller('favoritesController', Controller);
    })();


  