(function () {
    'use strict';

    angular.module('appAddP').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-addp');

        $stateProvider.state('root.addp', {
            url: '/addp',
            templateUrl: 'app-addp/templates/app-addp.template.html',
            controller: 'appAddPController',
            controllerAs: 'vm'
        });

    });
})();
