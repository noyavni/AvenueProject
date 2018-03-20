(function () {
    'use strict';


    function Controller($rootScope, $scope, appAddProductService, Upload, $timeout) {
        // private variables
        var self = this;
        self.list = [];
        self.list2 = [];
        var listProduct = [];
        var formdata = new FormData();


        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });

            var imageName = $.ajax({
                url: "/NApp/Sources/fakeServer/WebService.asmx/setProductImages",
                type: "POST",
                contentType: false,
                processData: false,
                data: formdata,
                async: false,
            }).responseText
        }

        appAddProductService.getAllBShapes().then(function (result) {
            for (var i = 0; i < result.length ; i++) {
                self.list2[i] = result[i].PShape;
            }
        });

        appAddProductService.getAllPTypes().then(function (result) {
            for (var i = 0; i < result.length ; i++) {
                self.list[i] = result[i].Category;
            }
        });

        function uploadFiles(file, errFiles) {
            self.f = file;
            self.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: "/NApp/Sources/fakeServer/WebService.asmx/insertNewCategotry",//'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: { categoryName: "noy" } //{ file: file }
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    },10000);
                }, function (response) {
                    if (response.status > 0)
                        self.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        }

        self.uploadFiles = uploadFiles;

    }
    angular
        .module('appAddProduct')
        .controller('appAddProductController', Controller);

})();
