'use strict';

angular.module('evenlyApp')
  .controller('AddCardCtrl', ['$scope', 'CreditCard', 'balanced', function ($scope, CreditCard, balanced) {
    $scope.addCard = function() {
      console.log("adding card");
      balanced.tokenizeCard($scope.card, null);
    }
  }]);
