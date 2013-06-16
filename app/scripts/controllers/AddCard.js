'use strict';

angular.module('evenlyApp')
  .controller('AddCardCtrl', ['$scope', 'CreditCard', 'balanced', function ($scope, CreditCard, balanced) {
    $scope.addCard = function() {
      if ($scope.validForm()) {
        console.log("adding card");
        balanced.tokenizeCard($scope.card, null);
      } else {
        $scope.showErrors = true;
      }
    }

    $scope.validForm = function() {
      return !$scope.form.number.$error.cardNumber &&
        !$scope.form.number.$error.required &&
        !$scope.form.cvc.$error.cardCVC &&
        !$scope.form.cvc.$error.required &&
        !$scope.form.expiry.$error.cardExpiry &&
        !$scope.form.expiry.$error.required;
    }

    $scope.classForButton = function() {
      return $scope.validForm() ? "btn btn-primary" : "btn btn-primary disabled"
    }
  }]);
