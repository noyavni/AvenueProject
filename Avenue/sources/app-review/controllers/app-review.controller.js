(function () {
    'use strict';

    function Controller($scope, $rootScope, $state, appReviewService, appShellService) {

        // private variables
        var self = this;

        self.revInfo = [];
        self.revStars = [];
        self.shellProperties = appShellService.getProperties();

        //private function
        $scope.getTimes = function (n) {
            return new Array(n);
        };

        appReviewService.getAllReviews().then(function (result) {
            for (var i = 0; i < result.length ; i++) {
                self.revInfo.push(result[i]);
                self.revInfo[i].revStars = [];
                for (var j = 0; j < (JSON.parse(self.revInfo[i].NumOfStars)) ; j++)
                {
                    self.revInfo[i].revStars.push(j);
                }

            }
           

        });

        self.goToAdd = function () {
            $state.go('root.review.addReview');
        }
        

    }

    angular
        .module('appReview')
        .controller('appReviewController', Controller);

})();
