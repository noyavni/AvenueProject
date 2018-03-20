(function () {
    'use strict';

    function Controller($rootScope, $scope, $state, appCollectionService) {

        // private variables
        var self = this;
        var formdata = new FormData();

        // public functions
        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
        }

        /* add new category */
        $scope.addCategory = function (ev) {
            var verify;
            if (formdata.get(0) != null && self.categoryName != null) {
                formdata.append("pcategory", self.categoryName);
                verify = appCollectionService.insertNewCategory(formdata);

                var msg = '';
                var cont = '';

                if (verify == 1) {
                    msg = 'Success';
                    cont = 'The Category has been uploaded';
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
        .module('appCollection')
        .controller('appCollectionAddController', Controller);

})();
