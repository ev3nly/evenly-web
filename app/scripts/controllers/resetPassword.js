'use strict';

angular.module('evenlyApp')
  .controller('ResetPasswordCtrl', ['$scope', 'Uri', function ($scope, Uri) {
    var params = Uri.getVariables(window.location.href);
    console.log(params);

    $scope.resetPassword = function() {
      $scope.submitAttempted = true;
      if ($scope.validForm()) {
        $scope.submitting = true;
        Me.resetPassword(params.token, $scope.password)
          .then(function(result) {
            $scope.submitting = false;
            $scope.success = true;
          }, function(response) {
            $scope.submitting = false;
            $scope.serverError = "Invalid or expired reset password link";
          });
      }
    }

    $scope.samePasswords = function() {
      return $scope.password === $scope.passwordConfirmation;
    }

    $scope.validForm = function() {
      return $scope.form.$valid && $scope.samePasswords();
    }

    if (!params.token) {
      $scope.noTokenError = "Invalid or expired reset password link";
    }
  }]);