(function () {
    'use strict';

    angular.module('appReview').config(function ($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('app-review');


        $stateProvider.state('root.review', {
            cache: false,
            url: '/review',
            template: '<div ui-view></div>',
            abstract: true
        });

        $stateProvider.state('root.review.reviews', {
            url: '/reviews',
            templateUrl: 'app-review/templates/app-review.template.html',
            controller: 'appReviewController',
            controllerAs: 'vm'
        });

        $stateProvider.state('root.review.addReview', {
            url: '/addReview',
            templateUrl: 'app-review/templates/app-addReview.template.html',
            controller: 'appAddReviewController',
            controllerAs: 'vm'
        });

    });
})();
