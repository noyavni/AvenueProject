(function () {
    'use strict';

    angular.module('appAddProduct').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-addproduct');

        $stateProvider.state('root.addproduct', {
            url: '/addproduct',
            templateUrl: 'app-addproduct/templates/app-addproduct.template.html',
            controller: 'appAddProductController',
            controllerAs: 'vm'
        });

    });
})();
