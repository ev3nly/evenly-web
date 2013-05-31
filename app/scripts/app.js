'use strict';

window.Evenly = angular.module('evenlyApp', ['restangular']);

Evenly.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/splash', {
      templateUrl: 'views/splash.html',
      controller: 'SplashCtrl'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

Evenly.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

Evenly.config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost\\:5000/api/v2');
}]);