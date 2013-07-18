'use strict';
/* jshint camelcase: false */
/* global _: false */
/* global moment: false */

angular.module('evenlyApp').controller('HomeCtrl', ['$scope', 'Me', '$rootScope', 'Story', function ($scope, Me, $rootScope, Story) {
  $rootScope.loadNewsfeed = function() {
    Me.newsfeed()
      .then(function(stories) {
        $rootScope.newsfeed = stories;
        _.each(stories, function(s) {
          s.publishedString = moment(s.published_at).fromNow();

          if (s.verb === 'withdrew') {
            s.imagePath = '/images/cash-left.png';
          } else if (s.subject.id !== $rootScope.me.id && s.target.id !== $rootScope.me.id) {
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

  $scope.storyLikedByUser = function(story, userId) {
    var liked = false;
    _.each(story.likes, function(like) {
      if (like.liker.id === userId) {
        liked = true;
      }
    });
    return liked;
  };

  $scope.storyLikesString = function(story) {
    if (story.likes.length) {
      if ($scope.storyLikedByUser(story, $rootScope.me.id)) {
        var remainingLikesCount = (story.likes.length - 1);
        if (remainingLikesCount === 0) {
          return 'You';
        } else {
          return 'You + ' + remainingLikesCount.toString();
        }
      } else {
        return story.likes.length.toString();
      }
    } else {
      return "Like";
    }
  };

  $scope.heartImage = function(story) {
    return $scope.storyLikedByUser(story, $rootScope.me.id) ? '/images/heart-red.png' : '/images/heart.png';
  };

  $scope.heartPressed = function(story) {
    if ($scope.storyLikedByUser(story, $rootScope.me.id)) {
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

  $rootScope.$watch('me', function(value) {
    if (value) {
      $scope.loadNewsfeed();
    }
  })

  if ($rootScope.me) {
    $scope.loadNewsfeed();
  }
}]);
