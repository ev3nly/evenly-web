'use strict';

var Evenly = angular.module('evenlyApp', ['restangular', 'ngCookies', 'ui.bootstrap', 'ui.validate', 'Payment']);

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
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/wallet', {
      templateUrl: 'views/wallet.html',
      controller: 'WalletCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);
  // .run(['$rootScope', '$location', function($rootScope, $location) {
  //   if ($rootScope.authenticationToken == null) {
  //     $location.path('/login');
  //   } else {
  //     $location.path('/home');
  //   }
  // }]);

Evenly.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

Evenly.config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost\\:5000/api/v1');
  // RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
  //   console.log("hello dude!");
  //   alert("sheit up");
  //   return response.data;
  // });
}]);

window.Evenly = Evenly;