'use strict';


Evenly.controller('HomeCtrl', ['$scope', 'Me', 'Restangular', '$http', '$rootScope', function ($scope, Me, Restangular, $http, $rootScope) {
  Me.newsfeed()
    .then(function(stories) {
      $scope.newsfeed = stories;
      _.each(stories, function(s) { console.log(s); });
    });
}]);
