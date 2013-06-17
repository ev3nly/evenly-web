'use strict';

angular.module('evenlyApp')
  .controller('CardsCtrl', ['$scope', 'CreditCard', function ($scope, CreditCard) {
    CreditCard.all()
      .then(function(cards) {
        _.each(cards, function(c) {console.log(c);});
        $scope.cards = cards;
      }, function(response) {
        console.error(response);
      });
  }]);
