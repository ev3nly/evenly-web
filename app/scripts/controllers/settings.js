'use strict';

angular.module('evenlyApp')
  .controller('SettingsCtrl', ['$scope', '$rootScope', 'Me', function ($scope, $rootScope, Me) {
    $rootScope.$watch('me', function() {
      if ($rootScope.me) {
        $scope.name = $rootScope.me.name;
        $scope.email = $rootScope.me.email;
        $scope.phoneNumber = $rootScope.me.phone_number;
      }
    });

    $scope.profileHasChanged = function() {
      if ($rootScope.me) {
        return ($rootScope.me.name !== $scope.name) ||
          ($rootScope.me.email !== $scope.email) ||
          ($rootScope.me.phone_number !== $scope.phoneNumber)
      } else {
        return false;
      }
    };

    $scope.saveProfileButtonEnabled = function() {
      return $scope.profileHasChanged() && !$scope.submitting
    };

    $scope.saveProfileButtonTitle = function() {
      return $scope.submitting ? "Submitting..." : "Save Profile";
    };

    $scope.submitting = false;

    $scope.saveProfile = function() {
      if (!$scope.saveProfileButtonEnabled()) { return; }

      $scope.submitting = true;

      Me.put({
        name: $scope.name,
        email: $scope.email,
        phone_number: $scope.phoneNumber
      }).then(function(me) {
        $scope.submitting = false;
        $rootScope.me = me;
        toastr.success("Profile Updated!");
      }, function(response) {
        $scope.submitting = false;
        _.map(response.data.errors, function(error) {
          toastr.error(error);
        });
      });
    };
  }]);
