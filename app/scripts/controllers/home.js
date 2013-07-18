'use strict';
/* jshint camelcase: false */
/* global _: false */
/* global moment: false */

angular.module('evenlyApp').controller('HomeCtrl', ['$scope', 'Me', '$rootScope', 'Story', function ($scope, Me, $rootScope, Story) {
  $rootScope.showNav = true;
  $scope.loadNewsfeed = function() {
    Me.newsfeed()
      .then(function(stories) {
        $rootScope.newsfeed = stories;
        _.each(stories, function(s) {
          s.publishedString = moment(s.published_at).fromNow();

          s.likedByUser = function(userId) {
            var liked = false;
            _.each(s.likes, function(like) {
              if (like.liker.id === userId) {
                liked = true;
              }
            });
            return liked;
          };
          
          s.likesString = function() {
            if (s.likes.length) {
              if (s.likedByUser($rootScope.me.id)) {
                var remainingLikesCount = (s.likes.length - 1);
                if (remainingLikesCount === 0) {
                  return 'You';
                } else {
                  return 'You + ' + remainingLikesCount.toString();
                }
              } else {
                return s.likes.length.toString();
              }
            } else {
              return "Like";
            }
          };

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
  };

  $scope.heartImage = function(story) {
    return story.likedByUser($rootScope.me.id) ? '/images/heart-red.png' : '/images/heart.png';
  };

  $scope.heartPressed = function(story) {
    if (story.likedByUser($rootScope.me.id)) {
      $scope.unlike(story);
    } else {
      $scope.like(story);
    }
  };

  $scope.like = function(story) {
    var fauxLike = {
      class: 'Like',
      liker: {
        class: 'User',
        id: $rootScope.me.id,
        name: $rootScope.me.name
      }
    };

    story.likes.push(fauxLike);

    Story.like(story.id)
      .then(function() {

      }, function(response) {
        toastr.error(response.data.errors[0]);
      });
  };

  $scope.unlike = function(story) {
    story.likes = _.filter(story.likes, function(like) { 
      return like.liker.id !== $rootScope.me.id; 
    });

    Story.unlike(story.id)
      .then(function() {

      }, function(response) {
        toastr.error(response.data.message);
      });
  };

  $scope.loadNewsfeed();

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
