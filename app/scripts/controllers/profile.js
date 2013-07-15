'use strict';

angular.module('evenlyApp')
  .controller('ProfileCtrl', ['$scope', function ($scope) {
    $scope.logout = function() {
      var wantsToLogout = confirm('Are you sure you want to logout?');
      if (wantsToLogout) {
        alert('should log you out');
      } else {

      }
    };
  }]);
