(function () {
    'use strict';

    angular.module('appStore').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-store');

        $stateProvider.state('root.store', {
            url: '/store/{item}',
            params: {item: null},
            templateUrl: 'app-store/templates/app-store.template.html',
            controller: 'appStoreController',
            controllerAs: 'vm'
        });

    });
})();
