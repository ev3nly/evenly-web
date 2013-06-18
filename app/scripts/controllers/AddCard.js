'use strict';
/*global $:false */

angular.module('evenlyApp')
  .controller('AddCardCtrl', ['$scope', 'CreditCard', 'balanced', function ($scope, CreditCard, balanced) {
    $scope.addCard = function() {
      if ($scope.validForm()) {
        console.log('adding card');
        balanced.tokenizeCard($scope.card, function(response) {
          if (response.status === 201) {
            CreditCard.create({uri: response.data.uri})
              .then(function(result) {
                console.log('Added credit card!');
                console.log(result);
              }, function(response) {
                console.log('Failed to add credit card to Vine');
                console.log(response);
              });
          }
        });
      } else {
        $scope.showErrors = true;
      }
    };

    $scope.cardType = function(num) {
      return $.payment.cardType(num);
    };

    $scope.validForm = function() {
      if ($scope.form.number === undefined ||
          $scope.form.cvc === undefined ||
          $scope.form.expiry === undefined) {
        return false;
      }

      return !$scope.form.number.$error.cardNumber &&
        !$scope.form.number.$error.required &&
        !$scope.form.cvc.$error.cardCVC &&
        !$scope.form.cvc.$error.required &&
        !$scope.form.expiry.$error.cardExpiry &&
        !$scope.form.expiry.$error.required;
    };

    $scope.classForButton = function() {
      return $scope.validForm() ? 'btn btn-primary' : 'btn btn-primary disabled';
    };
  }]);
