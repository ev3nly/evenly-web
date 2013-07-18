'use strict';

angular.module('evenlyApp')
  .controller('StaticNavCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
    $scope.stateForItem = function(item) {
      var currentPath = $location.path().substring(1);
      return (item === currentPath) ? 'active' : '';
    }

    $('nav.static-nav').affix();
  }]);
