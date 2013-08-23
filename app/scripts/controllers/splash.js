'use strict';

angular.module('evenlyApp')
  .controller('SplashCtrl', ['$scope', '$FB', '$location', '$rootScope', 'Uri', 'angularFire', function ($scope, $FB, $location, $rootScope, Uri, angularFire) {
    var params = Uri.getVariables(window.location.href);
    if (params.campaign) {
      $rootScope.campaign = params.campaign;
      $rootScope.campaignCode = "CAMP-" + $rootScope.campaign.toUpperCase();
    }

    $scope.carouselInterval = 7500;
    
    $scope.slides = [
      {image: '/images/splash-carousel-1.gif',text: 'Kitten.'},
      {image: '/images/splash-carousel-2.gif',text: 'Kitty!'},
      {image: '/images/splash-carousel-3.gif',text: 'Cat.'},
      {},
      {}
    ];

    $scope.taglines = [
      {},
      {},
      {}
    ];

    $scope.brochures = [
      {
        title: 'Pay anyone, safely',
        description: 'Cash is a pain. Add a card to your Evenly wallet and pay anyone, anywhere, anytime.',
        image: '/images/dawwww.jpg'
      },
      {
        title: 'Collect money, effortlessly',
        description: 'Stop hassling friends. Send a request and we\'ll remind your friends until they pay you back.',
        image: '/images/dawwww.jpg'
      },
      {
        title: 'Deposit, instantly',
        description: 'With one tap, securely deposit the cash in your Evenly wallet into any bank account.',
        image: '/images/dawwww.jpg'
      }
    ];

    $rootScope.facebookContinue = function() {
      mixpanel.track('fb-continue button clicked');
      if ($FB.isAuthenticated()) {
        console.log('Facebook is Authenticated');
        $location.path('/signup');
        $rootScope.dismissCampaignModal();
        mixpanel.track('fb already authenticated');
      } else {
        $FB.login(function(response) {
          if (response.authResponse) {
            console.log("logged into Facebook!")
            $location.path('/signup');
            $rootScope.dismissCampaignModal();
            $scope.$apply();
            mixpanel.track('fb authentication successful');
          } else {
            console.log("failed to login to Facebook");
            mixpanel.track('fb authentication failed');
          }
        }, {scope: 'email'});
      }
    };

    if ($rootScope.campaign) {
      var url = 'https://evenly.firebaseio.com/' + $rootScope.selectedServerOption.name + '/' + $rootScope.campaignCode + '-count';
      angularFire(url, $scope, 'spotsLeft', 0)
        .then(function(spotsLeft) {
                console.log($scope.spotsLeft);
                $scope.showBonusTicker = !!($scope.spotsLeft);
              });
    } else {
      var url = 'https://evenly.firebaseio.com/' + $rootScope.selectedServerOption.name + '/splash-count';
      angularFire(url, $scope, 'spotsLeft', 0)
        .then(function() {
                console.log($scope.spotsLeft);
                $scope.showSplashTicker = $scope.spotsLeft > 0;
                var splashCount = new Firebase(url);
                splashCount.transaction(function(count) {
                  if (count > 0)
                    return count - 1;
                  else
                    return 0;
                });
              });
    }
  }]);
