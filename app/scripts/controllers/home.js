'use strict';


Evenly.controller('HomeCtrl', ['$scope', 'Me', function ($scope, Me) {
  Me.newsfeed()
    .then(function(stories) {
      $scope.newsfeed = stories;
      // _.each(stories, function(s) { console.log(s); });
    });
}]);
