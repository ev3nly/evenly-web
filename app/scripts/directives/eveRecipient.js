'use strict';
/*global _:false */
/*jshint unused: vars */

angular.module('evenlyApp')
  .directive('eveRecipient', ['User', function (User) {
    return {
      templateUrl: 'views/recipient.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.getUsers = function(query) {
          console.debug('querying ' + query);

          return User.all(query)
            .then(function(users) {
              return _.map(users, function(u) {
                return {
                  name: u.name,
                  id:   u.id
                };
              });
            });
        };

        scope.onSelect = function($item, $model, $label) {
          console.log($item);
          console.log($model);
          console.log($label);

          scope.recipientId = $item.id;
        };

        scope.validRecipient = function() {
          if (scope.recipient == null || scope.recipient.length == 0) { return true; }
          if (scope.recipientId) { return true; }
          else {
            var re = /\S+@\S+\.\S+/;
            return re.test(scope.recipient);
          }
        }

      }
    };
  }]);
