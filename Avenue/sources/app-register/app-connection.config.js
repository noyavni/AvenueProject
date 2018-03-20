(function () {
    'use strict';

    angular.module('appRegister').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-register');

        $stateProvider.state('root.register', {
            url: '/register',
            templateUrl: 'app-register/templates/app-register.template.html',
            controller: 'appRegisterController',
            controllerAs: 'vm'
        });

    });
})();
