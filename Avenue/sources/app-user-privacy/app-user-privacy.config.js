(function () {
    'use strict';

    angular.module('appUserPrivacy').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-user-privacy');



        $stateProvider.state('root.userPivacy', {
            cache: false,
            url: '/userPivacy',
            template: '<div ui-view></div>',
            abstract: true
        });

        $stateProvider.state('root.userPivacy.cart', {
            url: '/cart',
            templateUrl: 'app-user-privacy/templates/user-cart.template.html',
            controller: 'cartController',
            controllerAs: 'vm'
        });

        $stateProvider.state('root.userPivacy.properties', {
            url: '/properties',
            templateUrl: 'app-user-privacy/templates/user-properties.template.html',
            controller: 'propertiesController',
            controllerAs: 'vm'
        });

        $stateProvider.state('root.userPivacy.favorites', {
            url: '/favorites',
            templateUrl: 'app-user-privacy/templates/user-favorites.template.html',
            controller: 'favoritesController',
            controllerAs: 'vm'
        });


    });
})();
