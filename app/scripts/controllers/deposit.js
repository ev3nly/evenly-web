'use strict';

angular.module('evenlyApp')
  .controller('DepositCtrl', ['$scope', 'Deposit', 'BankAccount', '$rootScope', function ($scope, Deposit, BankAccount, $rootScope) {
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

    $scope.test = ["hi", "there", "buddy"];

    // $scope.test = function() {
    //   console.log($rootScope.bankAccounts);
    // }

    $scope.loadBankAccounts = function() {
      BankAccount.all()
        .then(function(bankAccounts) {
          _.each(bankAccounts, function(ba) {console.log(ba);});
          $scope.bankAccounts = bankAccounts;
        }, function(response) {
          console.error(response);
        });
    };

    // $scope.loadBankAccounts();
  }]);
