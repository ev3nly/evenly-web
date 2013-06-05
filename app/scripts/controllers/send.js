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
  }]);
