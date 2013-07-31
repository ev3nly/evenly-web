'use strict';

angular.module('evenlyApp')
  .controller('SettingsCtrl', ['$scope', '$rootScope', 'Me', '$timeout', function ($scope, $rootScope, Me, $timeout) {
    $rootScope.$watch('me', function() {
      if ($rootScope.me) {
        $scope.name = $rootScope.me.name;
        $scope.email = $rootScope.me.email;
        $scope.phoneNumber = $rootScope.me.phone_number;
      }
    });

    Me.getNotificationSettings()
      .then(function(settings) {
        $scope.emailNotifications = settings[0].email;
        $scope.smsNotifications = settings[0].sms;
        // $scope.pushNotifications = settings[0].push;

        $scope.$watch('emailNotifications', function() {
          Me.putNotificationSettings({event: 'all', email: $scope.emailNotifications});
        });

        $scope.$watch('smsNotifications', function() {
          Me.putNotificationSettings({event: 'all', sms: $scope.smsNotifications});
        })
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

    $scope.validPassword = function() {
      return ($scope.password) &&
        ($scope.passwordConfirmation) && 
        ($scope.password === $scope.passwordConfirmation);
    }

    $scope.saveProfileButtonEnabled = function() {
      return ($scope.profileHasChanged() || $scope.validPassword()) && !$scope.submitting;
    };

    $scope.saveProfileButtonTitle = function() {
      return $scope.submitting ? "Submitting..." : "Save Profile";
    };

    $scope.openChangePasswordModal = function() {
      $scope.changePasswordModalShouldBeOpen = true;
    };

    $scope.closeChangePasswordModal = function() {
      $scope.changePasswordModalShouldBeOpen = false;
      $scope.currentPassword = null;
      $scope.password = null;
      $scope.passwordConfirmation = null;
    }

    $scope.submitting = false;

    $scope.saveProfile = function() {
      if ($scope.password !== $scope.passwordConfirmation) {
        toastr.error("Passwords do not match");
        return;
      }

      if (!$scope.saveProfileButtonEnabled()) { return; }

      $scope.submitting = true;

      var params = {
        name: $scope.name,
        email: $scope.email,
        phone_number: $scope.phoneNumber
      };

      if ($scope.validPassword()) {
        params.password = $scope.password;
      }

      Me.put(params)
        .then(function(me) {
          $scope.submitting = false;
          $scope.password = null;
          $scope.passwordConfirmation = null;
          $scope.currentPassword = null;
          $rootScope.me = me;
          toastr.success("Profile Updated!");

          // $timeout(function() {
          //   $scope.closeChangePasswordModal();
          // }, 1000);
        }, function(response) {
          $scope.submitting = false;
          _.map(response.data.errors, function(error) {
            toastr.error(error);
          });
        });
    };
  }]);
