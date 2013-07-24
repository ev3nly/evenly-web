'use strict';
/* global _: false */

angular.module('evenlyApp')
  .controller('LoginCtrl', ['$scope', 'Session', '$rootScope', '$location', function ($scope, Session, $rootScope, $location) {

    $scope.login = function(email, password) {
      if ($scope.validForm() && !$scope.submitting) {
        $scope.submitting = true;
        Session
          .create(email, password)
          .then(function(result) {
            $location.path('/home');
            $scope.submitting = false;
          }, function(response) {
            $scope.serverError = response.data.message;
            $scope.submitting = false;
          });
      }
    };

    $scope.$watch('submitting', function(value) {
      $scope.buttonTitle = value ? 'Waiting...' : 'Continue';
    });

    $scope.validForm = function() {
      if ($scope.email && $scope.password) {
        return true;
      } else {
        return false;
      }
    };
  }]);
