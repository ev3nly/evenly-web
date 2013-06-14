'use strict';

angular.module('evenlyApp')
  .controller('ActionBarCtrl', ['$scope', function ($scope) {
    $scope.showPaymentModal = function() { $scope.paymentShouldBeOpen = true; };
    $scope.hidePaymentModal = function() { $scope.paymentShouldBeOpen = false; };

    $scope.showRequestModal = function() { $scope.requestShouldBeOpen = true; };
    $scope.hideRequestModal = function() { $scope.requestShouldBeOpen = false; };

    $scope.opts = {
      backdropFade: true,
      dialogFade: true
    };

    // $scope.showPaymentModal();

  }]);
