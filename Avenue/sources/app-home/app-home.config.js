(function () {
    'use strict';

    angular.module('appHome').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-home');

        $stateProvider.state('root.home', {
            url: '/home',
            templateUrl: 'app-home/templates/app-home.template.html',
            controller: 'appHomeController',
            controllerAs: 'vm'
        });

    });
})();
