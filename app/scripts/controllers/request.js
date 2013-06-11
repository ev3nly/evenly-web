'use strict';

angular.module('evenlyApp')
  .controller('RequestCtrl', ['$scope', 'Request', function ($scope, Request) {
    $scope.requestMoney = function() {
      $scope.submitAttempted = true;

      if ($scope.invalidForm()) {
        console.log("form is invalid!");
        return;
      }

      console.log($scope.recipient + " owes you $"
        + $scope.amount + " for "
        + $scope.description);

      toastr.info("Sending...");

      Request
        .create({
          amount:       $scope.amount,
          description:  $scope.description,
          to:           {email: $scope.recipient}})
        .then(function() {
          $scope.hideRequestModal();
          toastr.success("Requested!");
        }, function(response) {
          toastr.error(response.data, "Vine");
        })
    };
  }]);
