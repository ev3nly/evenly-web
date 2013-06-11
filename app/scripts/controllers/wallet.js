'use strict';

angular.module('evenlyApp')
  .controller('WalletCtrl', ['$scope', 'Me', function ($scope, Me) {
    Me.timeline()
      .then(function(stories) {
        $scope.receipts = stories;
      });
  }]);
