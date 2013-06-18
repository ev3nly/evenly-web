'use strict';
/*global _:false */

angular.module('evenlyApp')
  .controller('CardsCtrl', ['$scope', 'CreditCard', function ($scope, CreditCard) {
    $scope.loadCards = function() {
      CreditCard.all()
        .then(function(cards) {
          _.each(cards, function(c) {console.log(c);});
          $scope.cards = cards;
        }, function(response) {
          console.error(response);
        });
    };

    $scope.deleteCard = function(cardId) {
      CreditCard.destroy(cardId)
        .then(function(result) {
          console.log('destroyed!');
          console.log(result);
        }, function(response) {
          console.log('fucked up');
          console.log(response);
        });
    };

    $scope.activateCard = function(cardId) {
      CreditCard.activate(cardId)
        .then(function(result) {
          console.log('activated!');
          console.log(result);
          $scope.loadCards();
        }, function(response) {
          console.log('fucked up');
          console.log(response);
        });
    };

    $scope.loadCards();
  }]);