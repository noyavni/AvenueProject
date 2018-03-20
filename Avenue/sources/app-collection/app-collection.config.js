(function () {
    'use strict';

    angular.module('appCollection').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-collection');

        $stateProvider.state('root.collection', {
            cache: false,
            url: '/collection',
            template: '<div ui-view></div>',
            abstract: true
        });

        $stateProvider.state('root.collection.categories', {
            url: '/collection',
            templateUrl: 'app-collection/templates/app-collection.template.html',
            controller: 'appCollectionController',
            controllerAs: 'vm'
        });

        $stateProvider.state('root.collection.add', {
            url: '/collection/add',
            templateUrl: 'app-collection/templates/app-collection-add.template.html',
            controller: 'appCollectionAddController',
            controllerAs: 'vm'
        });

    });
})();

