(function () {
    'use strict';

    function Controller($rootScope, $scope, $stateParams, appOrdersService, appUserPrivacyService) {

        // private variables
        var self = this;
        var ordersHistoryArr = [];
        self.ordersHistoryObj = [];
        self.showDiv = [];
        

        function rowClicked(index) {
            if (self.showDiv === index) {
                self.showDiv = null;
            } else {
                self.showDiv = index;
            }
        }

        appOrdersService.getOrders().then(function (result) {

            for (var i = 0; i < result.length ; i++) {
                ordersHistoryArr.push(result[i]);
            }
            self.ordersHistoryObj = ordersHistoryArr;
            for (var j = 0; j < self.ordersHistoryObj.length; j++) {
                var orderNum = self.ordersHistoryObj[j].OrderNum;
                appUserPrivacyService.getOrdersByNum(orderNum, j).then(function (result) {
                    self.ordersHistoryObj[result.index].items = result;
                });
            }
        });

       
     
        
        //public function
        self.rowClicked = rowClicked;
    }

    angular
        .module('appOrders')
        .controller('appOrdersController', Controller);

})();
