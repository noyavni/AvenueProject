(function () {
    'use strict';

    angular.module('appRegister').service('appRegisterService', function ($http, $q) {

        // private variables
        var self = this;

     

        //private functions
        function insertNewUser(userObj) {
            var deferred = $q.defer();
            var servicePath = "/NApp/Sources/fakeServer/WebService.asmx/register"
            var data = { userName: userObj.email, 
                         password: userObj.pass, 
                         firstName: userObj.fName,
                         lastName: userObj.lName,
                         phoneNumber: userObj.phone,
                         city: userObj.city,
                         street: userObj.street,
                         postcode: userObj.postcode,
                         shoulders: userObj.shoulders,
                         bust: userObj.bust,
                         waist: userObj.waist,
                         hips: userObj.hips                       
            };
            //data={}
           
            $http.post(servicePath, JSON.stringify(data)).then(function (result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject("no users");
                }
            }, function (reason) {
                deferred.reject("error" + reason);
            });

            return deferred.promise;
        }

        // public assignments
          self.insertNewUser = insertNewUser;



    });
})();