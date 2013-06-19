'use strict';
/* global _: false */

angular.module('evenlyApp')
  .controller('LoginCtrl', ['$scope', 'Session', function ($scope, Session) {

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
  }]);
