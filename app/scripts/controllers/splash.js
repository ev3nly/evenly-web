'use strict';

angular.module('evenlyApp')
  .controller('SplashCtrl', ['$scope', function ($scope) {
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
        title: 'Collect money, effortlessly.',
        description: 'Stop hassling friends. Send a request and we\'ll remind your friends until they pay you back.',
        image: '/images/dawwww.jpg'
      },
      {
        title: 'Deposit, instantly.',
        description: 'With one tap, securely deposit the cash in your Evenly wallet into any bank account.',
        image: '/images/dawwww.jpg'
      }
    ];
  }]);
