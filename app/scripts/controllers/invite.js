'use strict';

angular.module('evenlyApp')
  .controller('InviteCtrl', ['$scope', 'Invite', function ($scope, Invite) {
    $scope.buttonTitle = function() {
      return 'Send Invite';
    };

    $scope.invite = function() {
      $scope.submitAttempted = true;

      if ($scope.validForm()) {
        $scope.submitting = true;
        Invite.create($scope.email)
          .then(function() {
            toastr.success('Invited ' + $scope.email + ' to Evenly!');
            $scope.email = null;
            $scope.submitting = false;
            $scope.submitAttempted = false;
          }, function(response) {
            toastr.error(response.data.message);
            $scope.email = null;
            $scope.submitting = false;
            $scope.submitAttempted = false;
          });
      }
    };

    $scope.validForm = function() {
      if (!$scope.email) {
        return false;
      }

      return !$scope.form.email.$error.email;
    };
  }]);
