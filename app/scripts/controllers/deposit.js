'use strict';

angular.module('evenlyApp')
  .controller('DepositCtrl', ['$scope', 'Deposit', 'BankAccount', '$rootScope', function ($scope, Deposit, BankAccount, $rootScope) {
    $scope.makeDeposit = function() {
      if ($scope.submitting) { return; }
      if ($scope.validForm()) {
        $scope.submitting = true;
        Deposit.create({amount: $scope.amount, bank_account_id: $scope.selectedBankAccount.id})
          .then(function(result) {
            console.log('Deposit succeeded!');
            console.log(result);
            $scope.hideDepositModal();
            toastr.success('Deposit succeeded!');
            $rootScope.loadHistory();
            $scope.submitting = false;
          }, function(response) {
            console.error('failure');
            console.error(response);
            $scope.serverError = response.data.message;
            $scope.showErrors = true;
            $scope.submitting = false;
            $scope.showErrors = true;
          });
      } else {
        $scope.showErrors = true;
      }
    };

    $scope.selectBankAccountAtIndex = function(index) {
      $scope.selectedBankAccount = $rootScope.bankAccounts[index];
    };

    $rootScope.$watch('bankAccounts', function() {
      _.each($rootScope.bankAccounts, function(bankAccount) {
        if (bankAccount.status === 'active') {
          $scope.selectedBankAccount = bankAccount;
        }
      });
    });

    $scope.$watch('submitting', function(val) {
      $scope.buttonTitle = val ? 'Depositing' : 'Make Deposit';
    })

    $scope.validForm = function() {
      return !$scope.form.amount.$error.currency &&
        !$scope.form.amount.$error.gte;
    }

    $scope.classForButton = function() {
      if ($scope.submitting) {
        return 'btn btn-primary disabled';
      }

      return $scope.validForm() ? 'btn btn-primary' : 'btn btn-primary disabled';
    }
  }]);
