'use strict';

angular.module('evenlyApp')
  .controller('ActionBarCtrl', ['$scope', function ($scope) {
    $scope.showSendModal = function() { $scope.sendShouldBeOpen = true; };
    $scope.hideSendModal = function() { $scope.sendShouldBeOpen = false; };

    $scope.showRequestModal = function() { $scope.requestShouldBeOpen = true; };
    $scope.hideRequestModal = function() { $scope.requestShouldBeOpen = false; };

    $scope.opts = {
      backdropFade: true,
      dialogFade: true
    };
  }]);
