(function () {
    'use strict';
    //var appModule =
     angular
        .module('appModule')
        .config(function ($urlRouterProvider, $translateProvider, localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('Avenue');
            $urlRouterProvider.otherwise('/home'); // pending state
 
            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: './lang/{part}/{lang}.json'
            });


        });
})();
