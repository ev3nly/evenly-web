'use strict';

angular.module('evenlyApp')
  .controller('ResetPasswordCtrl', ['$scope', 'Uri', function ($scope, Uri) {
    var params = Uri.getVariables(window.location.href);
    console.log(params);

    if (params.token) {
      $scope.submitting = true;
      Me.confirmation(params.token)
        .then(function(result) {
          $scope.submitting = false;
          $scope.success = true;
        }, function(response) {
          $scope.submitting = false;
          $scope.serverError = "Invalid or expired confirmation link";
        });
    } else {
      $scope.serverError = "Invalid or expired confirmation link";
    }
  }]);
