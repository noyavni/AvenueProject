(function () {
    'use strict';

    angular.module('appOrders').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-orders');

        $stateProvider.state('root.orders', {
            url: '/orders',
            templateUrl: 'app-orders/templates/app-orders.template.html',
            controller: 'appOrdersController',
            controllerAs: 'vm'
        });

    });
})();
