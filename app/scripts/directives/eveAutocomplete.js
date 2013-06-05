'use strict';

angular.module('evenlyApp')
  .directive('eveAutocomplete', ['User', function (User) {
    return {
      templateUrl: 'views/autocomplete.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        User.all('e')
          .then(function(users) {
            scope.users = _.map(users, function(u) { return {name: u.name}; });
          });
      }
    };
  }]);
