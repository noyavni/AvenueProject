(function () {
    'use strict';


    function Controller($rootScope, $scope, appAddPService, appShellService) {
        // private variables
        var self = this;
        self.list = []; //list for pTypes
        self.list2 = []; //list for bShapes
        self.list3 = []; //list for designers
        var formdata = new FormData();


        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });     
        }

        /* get all bShapes */
        appAddPService.getAllBShapes().then(function (result) {
            for (var i = 0; i < result.length ; i++) {
                self.list2[i] = result[i].PShape;
            }
        });

        /* get all designers */
        appAddPService.getAllDesigners().then(function (result) {
            for (var i = 0; i < result.length ; i++) {
                self.list3[i] = result[i].DesignName;
            }
        });

        /* get all categories */
        appAddPService.getAllPTypes().then(function (result) {
            for (var i = 0; i < result.length ; i++) {
                self.list[i] = result[i].Category;
            }
        });

        /* add products */
        $scope.uploadFiles = function (ev) {
            var verify;
            if (formdata.get(0) != null && self.ProductName != null && self.Price != null && self.ProductShape != null && self.ProductType != null && self.Designer != null)
            {
                formdata.append("pname", self.ProductName);
                formdata.append("pprice", self.Price);
                formdata.append("pshape", self.ProductShape);
                formdata.append("pcategory", self.ProductType);
                formdata.append("pdesign", self.Designer);
                verify = appAddPService.setProduct(formdata);

                var msg = '';
                var cont = '';
                if (verify == 1) {
                    msg = 'Success';
                    cont = 'The Product has been uploaded';
                }
                else {
                    msg = 'Unexpected Error';
                    cont = '';
                }
                appShellService.Alert(msg, cont, ev);
                  
               
            }
            
        }


    }
    angular
        .module('appAddP')
        .controller('appAddPController', Controller);

})();
