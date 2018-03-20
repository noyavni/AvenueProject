(function () {
    'use strict';

    angular.module('appReview').service('appAddReviewService', function ($http, $q, appShellService) {
        // private variables
        var self = this;

        //private functions
        function addReview(stars, rev) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/insertNewReviews"
            var data = { numOfStars: stars, text: rev, user: appShellService.getUserName() };

            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject("no data");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        // public assignments
        self.addReview = addReview;

 

    });
})();