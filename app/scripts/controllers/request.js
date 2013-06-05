'use strict';

angular.module('evenlyApp')
  .controller('RequestCtrl', ['$scope', function ($scope) {
    $scope.requestMoney = function() {
      console.log($scope.autocomplete.recipient + " owes you $"
        + $scope.request.amount + " for "
        + $scope.request.description);
    };
  }]);
