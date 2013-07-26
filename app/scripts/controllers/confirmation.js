'use strict';

angular.module('evenlyApp')
  .controller('ConfirmationCtrl', ['$scope', 'Uri', 'Me', function ($scope, Uri, Me) {
    // http://www.paywithivy.com/users/confirmation.1044?confirmation_token=pAsarQpfhcTgKxnkJR67
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
          $scope.serverError = response.data.message;
        });
    } else {
      $scope.serverError = "Invalid or expired confirmation link"
    }
  }]);
