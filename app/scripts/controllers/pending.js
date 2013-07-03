'use strict';

angular.module('evenlyApp')
  .controller('PendingCtrl', ['$scope', 'Me', function ($scope, Me) {
    Me.pending()
      .then(function(pending) {
        $scope.pending = pending;
      });
  }]);
