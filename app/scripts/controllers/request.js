'use strict';
/*global toastr:false */
/*jshint unused: vars */

angular.module('evenlyApp')
  .controller('RequestCtrl', ['$scope', 'Request', function ($scope, Request) {
    $scope.makeRequest = function() {
      console.log($scope.recipient + ' owes you $' + $scope.amount + ' for ' + $scope.description);

      Request
        .create({
          amount:       $scope.amount,
          description:  $scope.description,
          to:           {email: $scope.recipient}
        })
        .then(function() {
          $scope.hideRequestModal();
          toastr.success('$' + $scope.amount + ' requested from ' + $scope.recipient + ' for ' + $scope.description);
          $scope.reset();
        }, function(response) {
          $scope.serverError = response.data;
          $scope.submitting = false;
          $scope.showRequestModal();
        });
    };

    $scope.page = 0;

    $scope.next = function() {
      if ($scope.page == 0) {
        $scope.step1Attempted = true;
      }


      if ($scope.nextDisabled()) { 
        return;
      }

      $('.carousel').carousel('next');
      $('.carousel').carousel('pause');
      $scope.page += 1;
    };

    $scope.nextDisabled = function() {
      if ($scope.page == 2) { return true; }
      if ($scope.page == 0) {
        return $scope.recipients.length <= 0
      }
    }

    $scope.prev = function() {
      if ($scope.page < 0) { return; }

      $('.carousel').carousel('prev');
      $('.carousel').carousel('pause');
      $scope.page -= 1;
    };

    $scope.addRecipient = function(recipient) {
      $scope.recipients.push(recipient);
    };

    $scope.removeRecipientAtIndex = function(index) {
      $scope.recipients.splice(index, 1);
    };

    $scope.$watch('recipients', function(newVal) {
      if (newVal.length > 1) {
        $scope.setGroup();
      }
    }, true);

    $scope.setFriend = function() {
      $scope.requestType = 'friend';
    };

    $scope.setGroup = function() {
      $scope.requestType = 'group';
    };

    $scope.addTier = function() {
      $scope.tiers.push({name: null, price: null});
      console.log("adding tier!");
    };

    $scope.removeTierAtIndex = function(index) {
      console.log("removing tier at index " + index);
      $scope.tiers.splice(index, 1);
    };

    $scope.recipients = [];
    
    $scope.tiers = [];
    $scope.addTier();
    $scope.addTier();

    $scope.setFriend();

    $scope.step1Attempted = false;

    $scope.addRecipient('justin');
    // $scope.addRecipient('zach');
    $scope.next();

    $scope.debug = function() {
      console.log("recipients: " + $scope.recipients);
      console.log("tiers: " + $scope.tiers);
      console.log("title: " + $scope.title);
      console.log("description: " + $scope.description);
      console.log("page: " + $scope.page);
    };
  }]);
