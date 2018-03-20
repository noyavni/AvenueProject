(function () {
    'use strict';

    function Controller($scope, $rootScope, $state, appReviewService, appAddReviewService, appShellService) {

        // private variables
        var self = this;

        //$scope.review;
     
        self.revObj = { numOfStars: '', rev: '' };
        self.selStars = 0; // initial stars count
        self.maxStars = 5; // maximum number of stars

        // a helper function used within view
        self.getStarArray = function () {
            var result = [];
            for (var i = 1; i <= this.maxStars; i++)
                result.push(i);
            return result;
        };

        // the class used to paint a star (filled/empty) by its position
        self.getClass = function (index) {
            return 'glyphicon glyphicon-star' + (self.selStars >= index ? '' : '-empty');
        };

        // set the DOM element class (filled/empty star)
        self.setClass = function (sender, index) {
            self.selStars = index;
            self.revObj.numOfStars = self.selStars;
            sender.currentTarget.setAttribute('class', self.getClass(index));
        };


        self.backToRevs = function (ev) {
            var msg = '';
            var cont = '';

                appAddReviewService.addReview(self.revObj.numOfStars, self.revObj.rev).then(function (result) {       
                

                    if (result.d == 1) {
                        msg = 'Success';
                        cont = 'The Review has been uploaded';
                    }
                    else {
                        msg = 'Unexpected Error';
                        cont = '';
                    }

                    appShellService.Alert(msg, cont, ev);
                    $state.go('root.review.reviews');
                })
            

            
        }



    }



    angular
        .module('appReview')
        .controller('appAddReviewController', Controller);

})();
