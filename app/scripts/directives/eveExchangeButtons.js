'use strict';

angular.module('evenlyApp')
  .directive('eveExchangeButtons', function () {
    return {
      templateUrl: 'views/exchange-buttons.html',
      restrict: 'E',
      // replace: true,
      link: function postLink(scope, element, attrs) {
        console.log('linking eveExchangeButtons ' + scope + ' ' + element + ' ' + attrs);

        scope.selectFriends = function() {
          scope.visibility = 'friends';
        };

        scope.selectPrivate = function() {
          scope.visibility = 'private';
        };

        scope.selectNetwork = function() {
          scope.visibility = 'network';
        };

        scope.visibilityIcon = function() {
          switch(scope.visibility) {
            case 'friends':
              return 'fui-user';
              break;
            case 'private':
              return 'fui-lock';
              break;
            case 'network':
              return 'fui-radio-checked';
              break;
          }
        };

        scope.visibilityString = function() {
          switch(scope.visibility) {
            case 'friends':
              return 'Friends';
              break;
            case 'private':
              return 'Private';
              break;
            case 'network':
              return 'Network';
              break;
            default:
              return 'sheit up';
              break;
          }
        };

        scope.visibility = 'friends';
      }
    };
  });
