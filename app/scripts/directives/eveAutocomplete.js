'use strict';

angular.module('evenlyApp')
  .directive('eveAutocomplete', ['User','$http', function (User, $http) {
    return {
      templateUrl: 'views/autocomplete.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.autocomplete = {};

        scope.getUsers = function(query) {
          console.debug("querying " + query);

          return User.all(query)
            .then(function(users) {
              return _.map(users, function(u){ return {name: u.name }; });
            });
        }
      }
    };
  }]);
