(function () {
    'use strict';

    angular.module('appInfo').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-info');

        $stateProvider.state('root.info', {
            url: '/info',
            templateUrl: 'app-info/templates/app-info.template.html',
            controller: 'appInfoController',
            controllerAs: 'vm'
        });

    });
})();
