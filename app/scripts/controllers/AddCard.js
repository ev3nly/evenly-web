'use strict';

angular.module('evenlyApp')
  .controller('AddCardCtrl', ['$scope', 'CreditCard', function ($scope, CreditCard) {
    $scope.addCard = function() {
      console.log("adding card");
    }

    
  }]);
