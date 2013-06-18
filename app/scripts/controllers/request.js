'use strict';

angular.module('evenlyApp')
  .controller('RequestCtrl', ['$scope', 'Request', function ($scope, Request) {
    $scope.makeRequest = function() {
      console.log($scope.recipient + " owes you $"
        + $scope.amount + " for "
        + $scope.description);

      Request
        .create({
          amount:       $scope.amount,
          description:  $scope.description,
          to:           {email: $scope.recipient}})
        .then(function() {
          $scope.hideRequestModal();
          toastr.success("$" + $scope.amount + " requested from " + $scope.recipient + " for " + $scope.description);
          $scope.reset();
        }, function(response) {
          $scope.serverError = response.data;
          $scope.submitting = false;
          $scope.showRequestModal();
        })
    };

  }]);
