(function () {
    'use strict';

    angular.module('appLogin').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-login');

        $stateProvider.state('root.login', {
            url: '/login',
            templateUrl: 'app-login/templates/app-login.template.html',
            controller: 'appLoginController',
            controllerAs: 'vm'
        });

    });
})();
