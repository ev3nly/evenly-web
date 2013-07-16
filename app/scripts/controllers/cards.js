'use strict';
/*global _:false */

angular.module('evenlyApp')
  .controller('CardsCtrl', ['$scope', 'CreditCard', '$rootScope', function ($scope, CreditCard, $rootScope) {
    $rootScope.loadCards = function() {
      CreditCard.all()
        .then(function(cards) {
          // _.each(cards, function(c) {console.log(c);});
          $rootScope.cards = cards;
        }, function(response) {
          console.error(response);
        });
    };

    $scope.deleteCard = function(cardId) {
      CreditCard.destroy(cardId)
        .then(function(result) {
          console.log('destroyed!');
          console.log(result);
          $scope.loadCards();
        }, function(response) {
          console.log('error');
          console.log(response);
          toastr.error(response.data);
        });
    };

    $scope.activateCard = function(cardId) {
      CreditCard.activate(cardId)
        .then(function(result) {
          console.log('activated!');
          console.log(result);
          $scope.loadCards();
        }, function(response) {
          console.log('error');
          console.log(response);
          toastr.error(response.data);
        });
    };

    $scope.loadCards();
  }]);
