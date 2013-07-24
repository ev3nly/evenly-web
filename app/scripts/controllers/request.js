'use strict';
/*global toastr:false */
/*jshint unused: vars */

angular.module('evenlyApp')
  .controller('RequestCtrl', ['$scope', 'Request', '$rootScope', function ($scope, Request, $rootScope) {
    $scope.makeRequest = function() {
      console.log($scope.recipient + ' owes you $' + $scope.amount + ' for ' + $scope.description);

      var toJSON = null;
      if ($scope.recipientId) {
        toJSON = {id: $scope.recipientId}
      } else {
        toJSON = {email: $scope.recipient}
      }

      Request
        .create({
          amount:       $scope.amount,
          description:  $scope.description,
          to:           toJSON,
          visibility:   $scope.visibility
        })
        .then(function() {
          $scope.hideRequestModal();
          toastr.success('$' + $scope.amount + ' requested from ' + $scope.recipient + ' for ' + $scope.description);
          
          if ($rootScope.newsfeed) {
            $scope.newsfeed.unshift({
              class: "Story",
              created_at: (new Date()),
              description: $scope.description,
              likes: [],
              published_at: (new Date()),
              source_type: "Charge",
              subject: $rootScope.me,
              target: {
                class: 'User',
                name: $scope.recipient
              },
              verb: 'requested'
            });
          } else if ($rootScope.history) {
            $rootScope.getPending();
          }

          $scope.reset();
        }, function(response) {
          $scope.serverError = response.data;
          $scope.submitting = false;
          $scope.showRequestModal();
        });
    };

  }]);
