'use strict';

angular.module('evenlyApp')
  .controller('DepositCtrl', ['$scope', 'Deposit', function ($scope, Deposit) {
    $scope.makeDeposit = function() {
      Deposit.create({amount: $scope.amount})
        .then(function(result) {
          console.log('Deposit succeeded!');
          console.log(result);
        }, function(response) {
          console.error('failure');
          console.error(response);
        });
    };
  }]);
