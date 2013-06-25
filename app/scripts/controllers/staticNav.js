'use strict';

angular.module('evenlyApp')
  .controller('StaticNavCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.stateForItem = function(item) {
      var currentPath = $location.path().substring(1);
      return (item === currentPath) ? 'active' : '';
    }
  }]);
