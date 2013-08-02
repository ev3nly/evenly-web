'use strict';
/*global $:false */

angular.module('evenlyApp')
  .controller('AddCardCtrl', ['$scope', 'CreditCard', 'balanced', '$rootScope', function ($scope, CreditCard, balanced, $rootScope) {
    $scope.addCard = function() {
      if ($scope.validForm()) {
        $scope.submitting = true;
        console.log('adding card');
        balanced.tokenizeCard($scope.card, function(response) {
          if (response.status === 201) {
            CreditCard.create({uri: response.data.uri})
              .then(function(result) {
                console.log('Added credit card!');
                console.log(result);
                $scope.submitting = false;
                $scope.hideAddCardModal();
                toastr.success('Added Card!');
                $rootScope.loadCards();
              }, function(response) {
                console.log('Failed to add credit card to Vine');
                console.log(response);
                toastr.error(response.data.message);
                $scope.submitting = false;
              });
          }
        });
      } else {
        $scope.showErrors = true;
      }
    };

    $scope.$watch('submitting', function() {
      $scope.buttonTitle = $scope.submitting ? 'Adding...' : 'Add Card';
    });

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
      if ($scope.submitting) {
        return 'btn btn-primary disabled';
      }
      return $scope.validForm() ? 'btn btn-primary' : 'btn btn-primary disabled';
    };
  }]);
