'use strict';
/*global toastr:false */

angular.module('evenlyApp')
  .controller('PaymentCtrl', ['$scope', 'Payment', function ($scope, Payment) {

    $scope.makePayment = function() {
      console.log('You owe ' + $scope.recipient + ' $' + $scope.amount + ' for ' + $scope.description);

      var toJSON = null;
      if ($scope.recipientId) {
        toJSON = {id: $scope.recipientId}
      } else {
        toJSON = {email: $scope.recipient}
      }

      Payment
        .create({
          amount:       $scope.amount,
          description:  $scope.description,
          to:           toJSON
        })
        .then(function() {
          $scope.hidePaymentModal();
          toastr.success('$' + $scope.amount + ' sent to ' + $scope.recipient + ' for ' + $scope.description);
          $scope.reset();
        }, function(response) {
          // toastr.error(response.data, 'Vine');
          $scope.serverError = response.data;
          $scope.submitting = false;
          $scope.showPaymentModal();
        });
    };

  }]);
