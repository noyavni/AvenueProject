(function () {
    'use strict';

    angular.module('appShell').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-shell');

        $stateProvider.state('root', {
            url: '',
            abstract: true,
            controllerAs: 'vm',
            controller: 'appShellController',
            templateUrl:  'app-shell/templates/app-shell.template.html'
        });

    });
})();
