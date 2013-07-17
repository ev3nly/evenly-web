'use strict';

angular.module('evenlyApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', 'Session', function ($scope, $rootScope, Session) {
    $scope.logout = function() {
      var wantsToLogout = confirm('Are you sure you want to logout?');
      if (wantsToLogout) {
        Session.deleteAuthenticationToken();
        $rootScope.$broadcast('event:loginRequired');
      } else {

      }
    };
  }]);
