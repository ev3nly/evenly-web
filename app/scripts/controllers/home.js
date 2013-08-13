'use strict';
/* jshint camelcase: false */
/* global _: false */
/* global moment: false */

angular.module('evenlyApp').controller('HomeCtrl', ['$scope', 'Me', '$rootScope', 'Story', '$FB', 'Invite', function ($scope, Me, $rootScope, Story, $FB, Invite) {
  $rootScope.loadNewsfeed = function() {
    Me.newsfeed()
      .then(function(stories) {
        $rootScope.newsfeed = stories;
        _.each(stories, function(s) {
          s.publishedString = moment(s.published_at).fromNow();
          if (!s.id) {
            s.publishedString = 'Example';
          }

          if (s.source_type === 'Hint') {
            s.story_type = 'Info';
            s.publishedString = 'Hint';
            return;
          } else if (s.source_type === 'GettingStarted') {
            s.story_type = 'Info';
            s.publishedString = 'Getting Started';
            return;
          } else if (s.source_type === 'User') {
            s.story_type = 'User';
            return;
          } else {
            s.story_type = 'Exchange';
          }

          if (s.verb === 'withdrew') {
            s.type = 'left';
          } else if (s.subject.id !== $rootScope.me.id && s.target.id !== $rootScope.me.id) {
            s.type = 'transfer';
          } else {
            if (s.subject.id === $rootScope.me.id) {
              if (s.verb === 'paid') {
                s.type = 'left';
              } else {
                s.type = 'coming';
              }
            } else if (s.target.id === $rootScope.me.id) {
              if (s.verb === 'paid') {
                s.type = 'came';
              } else {
                s.type = 'leaving';
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
    if (!story.likes) {
      return "Like";
    }

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

  // $scope.heartImage = function(story) {
  //   return $scope.storyLikedByUser(story, $rootScope.me.id) ? '/images/heart-red.png' : '/images/heart.png';
  // };

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

    if (!story.likes) {
      story.likes = [];
    }
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

  $scope.facebookContinue = function() {
    if ($FB.isAuthenticated()) {
      $scope.connectFacebook();
    } else {
      $FB.login(function(response) {
        if (response.authResponse) {
          console.log("logged into Facebook!")
          $scope.$apply();
          $scope.connectFacebook();
        } else {
          console.log("failed to login to Facebook");
        }
      }, {scope: 'email'});
    }
  };

  $scope.connectFacebook = function() {
    Me.put({
      facebook_id: $rootScope.fbId,
      facebook_token: $rootScope.fbToken
    }).then(function() {
      toastr.success('Connected Facebook!');
      $rootScope.me.facebookUser = true;
    }, function(response) {
      toastr.error(response.data.message);
    });
  };

  $scope.textDownloadApp = function() {
    $scope.texting = true;
    Invite.iOSDownload()
      .then(function() {
        toastr.success('Texted a link to ' + $rootScope.me.phone_number);
        $scope.texting = false;
      }, function(response) {
        toastr.error(response.data.message);
        $scope.texting = false;
      })
  }
}]);
