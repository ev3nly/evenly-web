'use strict';

angular.module('evenlyApp')
  .controller('PaymentCtrl', ['$scope', 'Payment', function ($scope, Payment) {
    $scope.makePayment = function() {
      $scope.submitAttempted = true;

      if ($scope.invalidForm()) {
        console.log("form is invalid!");
        return;
      }

      console.log("You owe " 
        + $scope.recipient + " $" 
        + $scope.amount + " for "
        + $scope.description);

      toastr.info("Sending...");

      Payment
        .create({
          amount:       $scope.amount, 
          description:  $scope.description, 
          to:           {email: $scope.recipient}})
        .then(function() {
          $scope.hideSendModal();
          toastr.success("Sent!");
        }, function(response) {
          toastr.error(response.data, "Vine");
        });
    };

  }]);
