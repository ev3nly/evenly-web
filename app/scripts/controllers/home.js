'use strict';
/* jshint camelcase: false */
/* global _: false */
/* global moment: false */

angular.module('evenlyApp').controller('HomeCtrl', ['$scope', 'Me', '$rootScope', function ($scope, Me, $rootScope) {
  Me.newsfeed()
    .then(function(stories) {
      $scope.newsfeed = stories;
      _.each(stories, function(s) {
        s.publishedString = moment(s.published_at).fromNow();

        if (s.subject.id !== $rootScope.me.id && s.target.id !== $rootScope.me.id) {
          s.imagePath = '/images/cash-transfer.png';
        } else {
          if (s.subject.id === $rootScope.me.id) {
            if (s.verb === 'paid') {
              s.imagePath = '/images/cash-left.png';
            } else {
              s.imagePath = '/images/cash-coming.png';
            }
          } else if (s.target.id === $rootScope.me.id) {
            if (s.verb === 'paid') {
              s.imagePath = '/images/cash-came.png';
            } else {
              s.imagePath = '/images/cash-leaving.png';
            }
          }
        }
      });
    });

  // $scope.test = function() {
  //   var opts = {
  //     lines: 13, // The number of lines to draw
  //     length: 20, // The length of each line
  //     width: 10, // The line thickness
  //     radius: 30, // The radius of the inner circle
  //     corners: 1, // Corner roundness (0..1)
  //     rotate: 0, // The rotation offset
  //     direction: 1, // 1: clockwise, -1: counterclockwise
  //     color: '#000', // #rgb or #rrggbb
  //     speed: 1, // Rounds per second
  //     trail: 60, // Afterglow percentage
  //     shadow: false, // Whether to render a shadow
  //     hwaccel: false, // Whether to use hardware acceleration
  //     className: 'spinner', // The CSS class to assign to the spinner
  //     zIndex: 2e9, // The z-index (defaults to 2000000000)
  //     top: 'auto', // Top position relative to parent in px
  //     left: 'auto' // Left position relative to parent in px
  //   };
  //   var target = document.getElementById('foo');
  //   var spinner = new Spinner(opts).spin(target);
  //   console.log('spun!');
  // };
}]);
