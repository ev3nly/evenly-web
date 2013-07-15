'use strict';

angular.module('evenlyApp')
  .controller('AddBankAccountCtrl', ['$scope', 'BankAccount', 'balanced', '$rootScope', function ($scope, BankAccount, balanced, $rootScope) {
    $scope.addBankAccount = function() {
      if ($scope.validForm()) {
        $scope.submitting = true;
        console.log('adding bank account');
        balanced.tokenizeBankAccount($scope.bankAccount, function(response) {
          if (response.status === 201) {
            BankAccount.create({uri: response.data.uri})
              .then(function(result) {
                console.log('Added bank account!');
                console.log(result);
                $scope.submitting = false;
                $scope.hideAddBankAccountModal();
                toastr.success('Added Bank Account!');
                $rootScope.loadBankAccounts();
              }, function(response) {
                console.log('Failed to add bank account to Vine');
                console.log(response);
                $scope.submitting = false;
              });
          }
        });
      } else {
        $scope.showErrors = true;
      }
    };

    $scope.$watch('submitting', function() {
      $scope.buttonTitle = $scope.submitting ? 'Adding...' : 'Add Bank Account';
    });

    $scope.validForm = function() {
      if ($scope.form.name === undefined ||
          $scope.form.routingNumber === undefined ||
          $scope.form.accountNumber === undefined) {
        return false;
      }

      return !$scope.form.name.$error.required &&
        !$scope.form.routingNumber.$error.required &&
        !$scope.form.accountNumber.$error.required;
    };

    $scope.classForButton = function() {
      if ($scope.submitting) {
        return 'btn btn-primary disabled';
      }
      return $scope.validForm() ? 'btn btn-primary' : 'btn btn-primary disabled';
    };
  }]);
