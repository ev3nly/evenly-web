'use strict';

angular.module('evenlyApp')
  .controller('AddBankAccountCtrl', ['$scope', 'BankAccount', 'balanced', function ($scope, BankAccount, balanced) {
    $scope.addBankAccount = function() {
      if ($scope.validForm()) {
        console.log("adding bank account");
        balanced.tokenizeBankAccount($scope.bankAccount, function(response) {
          if (response.status === 201) {
            BankAccount.create({uri: response.data.uri})
              .then(function(result) {
                console.log("Added bank account!");
                console.log(result);
              }, function(response) {
                console.log("Failed to add bank account to Vine");
              });
          }
        });
      } else {
        $scope.showErrors = true;
      }
    };

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
      return $scope.validForm() ? "btn btn-primary" : "btn btn-primary disabled";
    }
  }]);
