(function () {
    'use strict';

    function Controller($rootScope, $scope, $stateParams, appStoreService, appShellService) {

        // private variables
        var self = this;
        self.list = [{ prodName: '', image: [], price: '', bShape: '', imgRange: [], match: '' }];
        self.prodList = [];
        var counter = 1;
        var i = 0;
        //var loc = 0;
        //var imgNum;
        var category = $stateParams.item;
        $scope.myInterval = 3000;
        self.active = 'active';
        self.inactive = '';
        self.match;
        self.res = [];
        

        self.userDetails = appShellService.getUserObj();
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
            switch(res)
            {
                case "1": self.list[0].match = "./assets/img/red-filled-circle.svg";
                    break;
                case "2": self.list[0].match = "./assets/img/yellow-filled-circle.svg";
                    break;
                case "3": self.list[0].match = "./assets/img/green-filled-circle.svg";
                    break;
                default: self.list[0].match = "./assets/img/grey-filled-circle.svg";
            }
        }


        self.func = function () {
            window.alert("hi");
        }

        $scope.addToCart = function (item, ev) {
            var msg = '';
            var cont = '';
            if (self.userDetails == null)
            {
                msg = 'Alert';
                cont = 'You Must Login In Order To Purchase';
            }
            else
            {
                var check = appShellService.addtocart(item);
                if (check == true) {
                    msg = 'Success';
                    cont = 'The Product Added To Your Cart';
                }
                else {
                    msg = 'Failed';
                    cont = 'Sorry! Unexpected Error';
                }
            } 
            appShellService.Alert(msg, cont, ev);
        };

        $scope.addLike = function (item, ev) {
            var msg = '';
            var cont = '';
            if (self.userDetails == null) {
                msg = 'Alert';
                cont = 'You Must Login In Order To Add a Product To Your Likes';
                appShellService.Alert(msg, cont, ev);
            }
            else {
                appShellService.addLike(self.userDetails.UserName, item.prodName).then(function (result) {               
                    if (result.d == 1) {
                        msg = 'Success';
                        cont = 'The Product Added To Your Like List';
                    }
                    else {
                        msg = 'Already Exist';
                        cont = 'you Can Add 1 Like For Each Product';
                    }
                    appShellService.Alert(msg, cont, ev);
                })
            }
            

                //$mdDialog.show(
                //    $mdDialog.alert()
                //    .parent(angular.element(document.querySelector('#popupContainer')))
                //    .clickOutsideToClose(true)
                //    .title(msg)
                //    .textContent(cont)
                //    //.ariaLabel('Alert Dialog Demo')
                //    .ok('Got it!')
                //    .targetEvent(ev)
                //);
               
        };

        appStoreService.getAllProducts(category).then(function (result) {
            while (i < result.length) {              
                //imgNum = 0;
                self.list[0].prodName = result[i].image[0];
                self.list[0].image[0] = result[i].image[1];
                self.list[0].price = result[i].image[2];
                self.list[0].bShape = result[i].image[3];
                //self.list[0].imgRange.push(imgNum);
                if (counter < result.length) {
                    while (result[counter].image[0] == self.list[0].prodName) {
                        self.list[0].image.push(result[counter].image[1]);
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
        .module('appStore')
        .controller('appStoreController', Controller);

})();
