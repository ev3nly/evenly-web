'use strict';

var Evenly = angular.module('evenlyApp', ['restangular', 'ngCookies', 'ui.bootstrap', 'ui.validate', 'Payment']);

Evenly.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
    .when('/story', {
      templateUrl: 'views/story.html',
      controller: 'StoryCtrl'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    })
    .when('/jobs', {
      templateUrl: 'views/jobs.html',
      controller: 'JobsCtrl'
    })
    .when('/faq', {
      templateUrl: 'views/faq.html',
      controller: 'FaqCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl'
    })
    .when('/terms', {
      templateUrl: 'views/terms.html',
      controller: 'TermsCtrl'
    })
    .when('/privacy', {
      templateUrl: 'views/privacy.html',
      controller: 'PrivacyCtrl'
    })
    .when('/confirmation', {
      templateUrl: 'views/confirmation.html',
      controller: 'ConfirmationCtrl'
    })
    .when('/ios-download', {
      templateUrl: 'views/ios-download.html',
      controller: 'IosDownloadCtrl'
    })
    .when('/reset-password', {
      templateUrl: 'views/reset-password.html',
      controller: 'ResetPasswordCtrl'
    })
    .otherwise({
      redirectTo: '/splash'
    });

    // $locationProvider.html5Mode(true);
}]);

Evenly.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true; // CORS
  delete $httpProvider.defaults.headers.common['X-Requested-With']; // CORS

  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
  $httpProvider.defaults.headers.common['Client-Version'] = 'web-v0.1b0';

  var interceptor = ['$rootScope', '$q', function($rootScope, $q) {
    var success = function(response) {
      console.log(response.config.method + ' ' + response.config.url + ' Successful');
      return response;
    };

    var error = function(response) {
      var status = response.status;
      // $log.error(response.config.method + ' ' + response.config.url + ' failed with ' + status);
      if (status === 401) {
        // alert('Your session has ended.  Please login again');
        $.removeCookie('__evvt');
        $rootScope.$broadcast('event:loginRequired');
      }
      return $q.reject(response);
    };

    return function(promise) {
      return promise.then(success, error);
    };
  }];

  $httpProvider.responseInterceptors.push(interceptor);
}]);

Evenly.config(['$compileProvider', function($compileProvider) {
  $compileProvider.urlSanitizationWhitelist(/^\s*(https?|itms-services|mailto|tel):/);
}]);

// Evenly.config(['RestangularProvider', function(RestangularProvider) {
//   // RestangularProvider.setBaseUrl('http://localhost\\:5000/api/v1');
//   // RestangularProvider.setBaseUrl('https://germ.herokuapp.com/api/v1');
//   // RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
//   //   console.log("hello dude!");
//   //   alert("sheit up");
//   //   return response.data;
//   // });
// }]);

Evenly.run(['$location', '$rootScope', 'Me', 'Session', '$http', 'Restangular', function($location, $rootScope, Me, Session, $http, Restangular) {
  $http.defaults.headers.common['Authorization'] = Session.getAuthenticationToken();

  $rootScope.$on('event:loginRequired', function() {
    console.warn('Login Required!');
    $location.path('/login');
  });

  $rootScope.redirectToIosSplash = function() {
    if ((navigator.userAgent.indexOf('iPhone') != -1) ||  (navigator.userAgent.indexOf('iPod') != -1)) {  
      $location.path('/ios-download')
    }
  }

  $rootScope.$on('$routeChangeStart', function() {
    switch($location.path()) {
      case "/story":
      case "/contact":
      case "/faq":
      case "/jobs":
      case "/login":
      case "/signup":
      case "/terms":
      case "/privacy":
        $('.container').css('width', '100%');
        $rootScope.redirectToIosSplash();
        break;
      case "/confirmation":
      case "/reset-password":
      case "/ios-download":
        $('.container').css('width', '320px');
        break;
      default:
        $('.container').css('width', '940px');
        $rootScope.redirectToIosSplash();
        break;
    }
    
    switch($location.path()) {
      case "/story":
      case "/contact":
      case "/faq":
      case "/jobs":
      case "/login":
      case "/splash":
      case "/signup":
      case "/terms":
      case "/privacy":
      case "/confirmation":
      case "/reset-password":
      case "/ios-download":
      case "":
        break;
      default:
        $rootScope.refreshMe();
        break;
    }
  })

  $rootScope.defaultProfilePic = function(user_id) {
    if (!user_id) {
      user_id = Math.floor((Math.random()*100)+1);
    }
    var index = user_id % 6 + 1
    return '/images/profile-' + index + '.png';
  };

  $rootScope.refreshMe = function() {
    Me.get()
      .then(function(me) {
        $rootScope.me = me;
        $rootScope.me.firstName = function() {
          return $rootScope.me.name.split(' ')[0];
        };

        $rootScope.me.balanceString = function() {
          return Number($rootScope.me.balance).toFixed(2);
        }
      });
  };

  /* Server Options for switching between Germ, Vine, and Localhost */

  $rootScope.serverOptions = [
    {
      name: 'local', 
      url: 'http://localhost:5000/api/v1',
      balancedUri: '/v1/marketplaces/TEST-MP6oLyrmIAAsRrnzFWmWAQxo'
    },
    {
      name: 'germ', 
      url: 'https://germ.herokuapp.com/api/v1',
      balancedUri: '/v1/marketplaces/TEST-MP2Hr48FkuOXqouGYxNBibAc'
    },
    {
      name: 'vine', 
      url: 'https://paywithivy.com/api/v1',
      balancedUri: '/v1/marketplaces/MP4KYFmSZjnYzse0tPnu1s7l'
    }
  ]

  $rootScope.selectServerOption = function(option) {
    $rootScope.selectedServerOption = option;
    Restangular.setBaseUrl(option.url);
    $.cookie('__sc', $rootScope.serverOptions.indexOf(option));
  };

  if (window.location.href.indexOf("evenly.com") !== -1) {
    $rootScope.selectServerOption($rootScope.serverOptions[2]);

    if (window.location.protocol != 'https:') {
      window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
  } else {
    $rootScope.selectServerOption($rootScope.serverOptions[$.cookie('__sc') || 1]);
  }

  /* Modals for Cards and Banks */

  $rootScope.showAddCardModal = function() {
    $rootScope.addCardShouldBeOpen = true;
  };

  $rootScope.hideAddCardModal = function() {
    $rootScope.addCardShouldBeOpen = false;
  };

  $rootScope.showAddBankAccountModal = function() {
    $rootScope.addBankAccountShouldBeOpen = true;
  };

  $rootScope.hideAddBankAccountModal = function() {
    $rootScope.addBankAccountShouldBeOpen = false;
  };

  $rootScope.showDepositModal = function() {
    $rootScope.depositShouldBeOpen = true;
  };

  $rootScope.hideDepositModal = function() {
    $rootScope.depositShouldBeOpen = false;
  };

  $rootScope.addCardOpts = {
    backdropFade: true,
    dialogFade: true,
    dialogClass: 'modal cc-modal'
  };

  $rootScope.addBankAccountOpts = {
    backdropFade: true,
    dialogFade: true,
    dialogClass: 'modal ba-modal'
  };
}]);

window.Evenly = Evenly;