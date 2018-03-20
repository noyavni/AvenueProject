(function () {
    'use strict';

    function Controller($scope, $rootScope, $state, $filter, $window, appRegisterService, appShellService) {
        var self = this;
        var msg = '';
        var cont = '';

        self.userObj = {
            email: '',
            pass: '',
            confirmPass: '',
            fName: '',
            lName: '',
            phone: '',
            city: '',
            street: '',
            postcode: '',
            shoulders: '',
            hips: '',
            bust: '',
            waist: ''
        };
        
        self.addUser = function (ev) {
            if (self.userObj.email == undefined || self.userObj.email == "") {
                msg = 'Invalid E-Mail';
                cont = 'make sure your Email adress is correct';

                self.userObj.email = '';

                appShellService.Alert(msg, cont, ev);

            }
            else if (self.userObj.pass == undefined || self.userObj.pass == "") {
                msg = 'Invalid Password';
                cont = 'invalid password, please choose at least 8 characters';

                self.userObj.pass = '';
                self.userObj.confirmPass = '';

                appShellService.Alert(msg, cont, ev);

            }
            else if (self.userObj.pass != self.userObj.confirmPass) {
                msg = 'Invalid Password';
                cont = 'your passwords are not equal';

                self.userObj.pass = '';
                self.userObj.confirmPass = '';

                appShellService.Alert(msg, cont, ev);

            }
            else if (self.userObj.phone == "" || self.userObj.phone == undefined  || self.userObj.fName == "") {
                msg = 'Invalid Details';
                cont = 'Please make sure you entered all the required fields';


                appShellService.Alert(msg, cont, ev);
            }
            else {
                appRegisterService.insertNewUser(self.userObj).then(function (result) {
                    if (result.d == 'Unexpected Error') {
                        msg = 'User already exist';
                        cont = '';

                        appShellService.Alert(msg, cont, ev);

                    }
                    else {
                        msg = 'Success';
                        if (result.d == "") { cont = "Thank you for register" }
                        else { cont = 'Your Body Shape Is ' + result.d }
                        

                        appShellService.Alert(msg, cont, ev);

                        $state.go('root.home');

                    }
                })
            }

        }

        $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.wordToPass = /(?=.{8,})/;

        self.thisYear = $filter('date')(Date.now(), 'yyyy');
        self.yearArr = [];
        self.dayArr = [];
        
        self.monthArr = [{ id: 1, name: "January" },
                       { id: 2, name: "February" },
                       { id: 3, name: "March" },
                       { id: 4, name: "April" },
                       { id: 5, name: "May" },
                       { id: 6, name: "June" },
                       { id: 7, name: "July" },
                       { id: 8, name: "August" },
                       { id: 9, name: "September" },
                       { id: 10, name: "October" },
                       { id: 11, name: "November" },
                       { id: 12, name: "December" },
                       { id: 13, name: "Month"}
        ];


        function getDaysInMonth(m, y) {
            return /8|3|5|10/.test(--m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31;

        }

        for (var i = 39; i >= 1 ; i--) {
            self.yearArr[i] = $filter('date')(Date.now(), 'yyyy') - i;
        }
        self.yearArr[40] = 'Year';

        for (var i = 1; i <= (getDaysInMonth($scope.selectedMonth, $scope.selectedYear)) ; i++) {
            self.dayArr.push(i);
        }

        self.setDate = function () {
            self.dayArr = [];
            
            for (var i = 1; i <= (getDaysInMonth($scope.selectedMonth, $scope.selectedYear)) ; i++) {
                self.dayArr.push(i);
            }
            self.dayArr.push('Day');
            
        }
      


      

    }
    angular
        .module('appRegister')
        .controller('appRegisterController', Controller);

})();
