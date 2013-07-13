'use strict';
/* global _: false */

angular.module('evenlyApp')
  .controller('LoginCtrl', ['$scope', 'Session', '$rootScope', function ($scope, Session, $rootScope) {

    $scope.login = function(email, password) {
      Session
        .create(email, password)
        .then(function(result) {
          console.log(result);
          var pathComponents = window.location.href.split('/');
          pathComponents = _.initial(pathComponents, 2);
          window.location.href = pathComponents.join('/');
        });
    };

    $rootScope.showNav = false;
  }]);
