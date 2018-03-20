(function () {
    'use strict';

    angular.module('appReview').service('appReviewService', function ($http, $q) {
        // private variables
        var self = this;

        //private functions
        function getAllReviews() {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/getReviews"


            $http.post(servicePath).then(function (result) {
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
        self.getAllReviews = getAllReviews;

    });
})();