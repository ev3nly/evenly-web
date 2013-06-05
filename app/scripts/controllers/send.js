'use strict';

angular.module('evenlyApp')
  .controller('SendCtrl', ['$scope', 'User', function ($scope, User) {
    User.all('e')
      .then(function(users) {
        users = _.map(users, function(u){ return {name: u.name }; });
        $scope.users = users;
      });

    $scope.sendMoney = function() {
      console.log("You owe " 
        + $scope.autocomplete.recipient + " $" 
        + $scope.payment.amount + " for "
        + $scope.payment.description);

      // Payment.create({amount:'1', description:'Making a website', to:{email:'justin@paywithivy.com'}});
    };

    $scope.isCurrency = function(value) {
      return /^\$?[0-9][0-9\,]*(\.\d{1,2})?$|^\$?[\.]([\d][\d]?)$/.test(value);
    };

    $scope.isGte = function(value) {
      if (value === undefined) { return false; };
      return value.replace(/[^0-9\.]/g,'') >= 0.50;
    }

  }]);
