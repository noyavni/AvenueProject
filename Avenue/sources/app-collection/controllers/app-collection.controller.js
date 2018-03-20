(function () {
    'use strict';

    function Controller($rootScope, $scope, $state, appCollectionService, appShellService) {

        // private variables
        var self = this;
        self.list = []; //list for categories
        
        self.shellProperties = appShellService.getProperties();

        function navigate(item) {
            $state.go('root.store', { item: item });
        }

        function goToAddCategory() {
            $state.go('root.collection.add');
        }


        appCollectionService.getAllCategories().then(function (result) {
            for (var i = 0; i < result.length ; i++) {
                self.list.push(result[i]);
            }
        });
        
      
        
        // public assignment
        self.navigate = navigate;
        self.goToAddCategory = goToAddCategory;
       
    }

    angular
        .module('appCollection')
        .controller('appCollectionController', Controller);

})();
