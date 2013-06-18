'use strict';

angular.module('evenlyApp')
  .controller('BankAccountsCtrl', ['$scope', 'BankAccount', function ($scope, BankAccount) {
    $scope.loadBankAccounts = function() {
      BankAccount.all()
        .then(function(bankAccounts) {
          _.each(bankAccounts, function(ba) {console.log(ba);});
          $scope.bankAccounts = bankAccounts;
        }, function(response) {
          console.error(response);
        });
    };

    $scope.deleteBankAccount = function(bankAccountId) {
      BankAccount.destroy(bankAccountId)
        .then(function(result) {
          console.log('destroyed!');
          console.log(result);
        }, function(response) {
          console.log('fucked up');
          console.log(response);
        });
    };

    $scope.activateBankAccount = function(bankAccountId) {
      BankAccount.activate(bankAccountId)
        .then(function(result) {
          console.log('activated!');
          console.log(result);
          $scope.loadBankAccounts();
        }, function(response) {
          console.log('fucked up');
          console.log(response);
        });
    };

    $scope.loadBankAccounts();
  }]);
