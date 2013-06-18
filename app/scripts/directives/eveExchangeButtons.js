'use strict';

angular.module('evenlyApp')
  .directive('eveExchangeButtons', function () {
    return {
      templateUrl: 'views/exchange-buttons.html',
      restrict: 'E',
      // replace: true,
      link: function postLink(scope, element, attrs) {
        console.log('linking eveExchangeButtons ' + scope + ' ' + element + ' ' + attrs);
      }
    };
  });
