'use strict';
/*global _:false */

angular.module('evenlyApp')
  .controller('BankAccountsCtrl', ['$scope', 'BankAccount', '$rootScope', function ($scope, BankAccount, $rootScope) {
    $rootScope.loadBankAccounts = function() {
      BankAccount.all()
        .then(function(bankAccounts) {
          _.each(bankAccounts, function(ba) {
            ba.displayName = ba.bank_name.substring(0, 10) + '... ' + ba.account_number;
            if (ba.status === 'active') {
              $rootScope.activeBankAccount = ba;
            }
          });
          $rootScope.bankAccounts = bankAccounts;
        }, function(response) {
          console.error(response);
        });
    };

    $scope.deleteBankAccount = function(bankAccountId) {
      BankAccount.destroy(bankAccountId)
        .then(function(result) {
          console.log('destroyed!');
          console.log(result);
          $scope.loadBankAccounts();
          toastr.success("Bank Account Deleted!");
        }, function(response) {
          console.log('error');
          console.log(response);
          toastr.error(response.data);
        });
    };

    $scope.activateBankAccount = function(bankAccountId) {
      BankAccount.activate(bankAccountId)
        .then(function(result) {
          console.log('activated!');
          console.log(result);
          $scope.loadBankAccounts();
          toastr.success("Bank Account Activated!");
        }, function(response) {
          console.log('error');
          console.log(response);
          toastr.error(response.data);
        });
    };

    $scope.loadBankAccounts();
  }]);
