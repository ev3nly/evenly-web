'use strict';

angular.module('evenlyApp')
  .controller('PaymentCtrl', ['$scope', 'Payment', function ($scope, Payment) {
    // $scope.recipient = 'rhea@friend.edu';
    // $scope.amount = '100000';
    // $scope.description = 'failure';

    $scope.makePayment = function() {
      console.log('You owe ' + $scope.recipient + ' $' + $scope.amount + ' for ' + $scope.description);

      Payment
        .create({
          amount:       $scope.amount,
          description:  $scope.description,
          to:           {email: $scope.recipient}
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
