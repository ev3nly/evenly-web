'use strict';

angular.module('evenlyApp')
  .controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.name = 'Jabroni';

    $scope.stateForItem = function(item) {
      var currentPath = $location.path().substring(1);
      return (item === currentPath) ? 'active' : '';
    };

  }]);
