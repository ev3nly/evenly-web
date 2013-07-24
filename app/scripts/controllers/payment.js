'use strict';
/*global toastr:false */

angular.module('evenlyApp')
  .controller('PaymentCtrl', ['$scope', 'Payment', '$rootScope', function ($scope, Payment, $rootScope) {
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
          to:           toJSON,
          visibility:   $scope.visibility
        })
        .then(function() {
          $scope.hidePaymentModal();
          toastr.success('$' + $scope.amount + ' sent to ' + $scope.recipient + ' for ' + $scope.description);

          if ($rootScope.newsfeed) {
            $rootScope.newsfeed.unshift({
              class: "Story",
              created_at: (new Date()),
              description: $scope.description,
              likes: [],
              published_at: (new Date()),
              source_type: "Payment",
              subject: $rootScope.me,
              target: {
                class: 'User',
                name: $scope.recipient
              },
              verb: 'paid'
            });
          } else if ($rootScope.history) {
            $rootScope.loadHistory();
          }

          $scope.reset();
        }, function(response) {
          // toastr.error(response.data, 'Vine');
          $scope.serverError = response.data;
          $scope.submitting = false;
          $scope.showPaymentModal();
        });
    };

  }]);
