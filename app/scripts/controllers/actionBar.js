'use strict';

angular.module('evenlyApp')
  .controller('ActionBarCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.showPaymentModal = function() { $scope.paymentShouldBeOpen = true; };
    $rootScope.hidePaymentModal = function() { $scope.paymentShouldBeOpen = false; };

    $rootScope.showRequestModal = function() { $scope.requestShouldBeOpen = true; };
    $rootScope.hideRequestModal = function() { $scope.requestShouldBeOpen = false; };

    $rootScope.opts = {
      backdropFade: true,
      dialogFade: true
    };

    // $scope.showPaymentModal();

  }]);
