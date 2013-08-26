'use strict';

angular.module('evenlyApp')
  .controller('InviteCtrl', ['$scope', 'Invite', '$timeout', function ($scope, Invite, $timeout) {
    $scope.buttonTitle = function() {
      return 'Send Invite';
    };

    $scope.inviteUrl = 'https://evenly.com';

    $scope.inviteCount = 0;
    
    $scope.invitesLeft = function() {
      return (3 - ($scope.inviteCount % 3));
    };

    $scope.winCount = function() {
      return Math.floor($scope.inviteCount / 3)
    };

    $scope.wins = function() {
      return new Array($scope.winCount());
    };

    $scope.potentialWinnings = function() {
      return $scope.winCount() * 5;
    };

    $scope.invite = function() {
      $scope.submitAttempted = true;

      if ($scope.validForm()) {
        $scope.submitting = true;
        Invite.create($scope.inviteeData)
          .then(function() {
            // toastr.success('Invited ' + $scope.inviteeData + ' to Evenly!');
            $scope.inviteCount++
            // $scope.serverSuccess = 'Invited ' + $scope.inviteeData + ' to Evenly!  Invite ' + (3 - ($scope.inviteCount % 3)) + ' more and you could win $5!';
            $scope.serverSuccess = 'Invited ' + $scope.inviteeData + ' to Evenly!';
            $scope.serverError = null;
            $scope.inviteeData = null;
            $scope.submitting = false;
            $scope.submitAttempted = false;
          }, function(response) {
            $scope.serverError = response.data.error || response.data.message;
            $scope.serverSuccess = null;
            $scope.inviteeData = null;
            $scope.submitting = false;
            $scope.submitAttempted = false;
          });
      }
    };

    $scope.facebookShare = function() {
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent($scope.inviteUrl), 
        'facebook-share-dialog', 
        'width=626,height=436'); 
    };

    $scope.tweet = function() {
      var tweet = "Pay with @Evenly, save time, and earn money.  Sign up for free!"
      var link = 'http://twitter.com/home?status=' + encodeURIComponent(tweet + ' ' + $scope.inviteUrl);
      var x = screen.width/2 - 550/2; 
      var y = screen.height/2 - 450/2
      window.open(link, '', 'width=550, height=450, top=' + y + ', left=' + y);
    };

    $scope.validForm = function() {
      if (!$scope.inviteeData) {
        return false;
      }

      return true;
      // return !$scope.form.email.$error.email;
    };

    // Flash movie sheit for ZeroClipboard
    $timeout(function() {

      ZeroClipboard.setDefaults({moviePath: "/components/zeroclipboard/ZeroClipboard.swf"});
      var clip = new ZeroClipboard(document.getElementById("btn-clipboard"));

      clip.on('load', function(client) {
        console.log("movie is loaded");
      });

      clip.on('complete', function(client, args) {
        // this.style.display = 'none'; // "this" is the element that was clicked
        toastr.success("Copied link to clipboard");
        console.log("Copied text to clipboard: " + args.text );
      });

      clip.on('mouseover', function(client) {
        console.log("mouse over");
      });

      clip.on('mouseout', function(client) {
        console.log("mouse out");
      });

      clip.on('mousedown', function(client) {

        console.log("mouse down");
      });

      clip.on('mouseup', function(client) {
        console.log("mouse up");
      });

    }, 500);
  }]);
