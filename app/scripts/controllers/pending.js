'use strict';

angular.module('evenlyApp')
  .controller('PendingCtrl', ['$scope', 'Me', 'Request', '$rootScope', function ($scope, Me, Request, $rootScope) {
    $rootScope.getPending = function() {
      Me.pending()
        .then(function(pending) {
          $rootScope.pending = _.map(pending, function(request) {
            if (request.class === 'GroupCharge') {
              request.subject = request.to === 'me' ? 'You' : request.to;
              request.directObject = request.title;
            } else if (request.class === 'Charge') {
              request.subject = request.to.name || 'You';
              request.directObject = request.description;
            }

            request.formattedDate = Date.parse(request.created_at);
            request.target = request.from.name || request.from;
            request.verb = request.to.name ? 'owes' : 'owe';
            return request;
          });
        });
    }

    $scope.removeRequestFromPending = function(request) {
      var index = $scope.pending.indexOf(request);
      $scope.pending.splice(index, 1);
    };

    $scope.toastGenericFailure = function(response) {
      toastr.error(response.data, 'Error, please try again');
    };

    $scope.cancel = function(request) {
      Request.cancel(request.id)
        .then(function() {
          toastr.success('Canceled your $' + request.amount + ' Request to ' + request.to.name + ' for ' + request.description);
          $scope.removeRequestFromPending(request);
        }, function(response) {
          $scope.presentRequest(request);
          $scope.toastGenericFailure(response);
        });
      $scope.close()
    };

    $scope.remind = function(request) {
      Request.remind(request.id)
        .then(function() {
          toastr.success('Reminded ' + request.to.name + ' to pay you $' + request.amount + ' for ' + request.description);
        }, function(response) {
          $scope.presentRequest(request);
          $scope.toastGenericFailure(response);
        });
      $scope.close();
    };

    $scope.reject = function(request) {
      Request.deny(request.id)
        .then(function() {
          toastr.success('Rejected ' + request.from.name + '\'s $' + request.amount + ' Request for ' + request.description);
          $scope.removeRequestFromPending(request);
        }, function(response) {
          $scope.presentRequest(request);
          $scope.toastGenericFailure(response);
        });
      $scope.close();
    };

    $scope.pay = function(request) {
      Request.complete(request.id)
        .then(function() {
          toastr.success('Paid ' + request.from.name + '\'s $' + request.amount + ' Request for ' + request.description);
          $scope.removeRequestFromPending(request);
        }, function(response) {
          $scope.presentRequest(request);
          $scope.toastGenericFailure(response);
        });
      $scope.close();
    };

    $scope.presentRequest = function(request) {
      $scope.currentRequest = request;
      if (request.class === 'GroupCharge') {
        $scope.pendingGroupRequestModalShouldBeOpen = true;
      } else if (request.class === "Charge") {
        if (request.to === 'me') {
          $scope.pendingReceivedRequestModalShouldBeOpen = true;
        } else if (request.from === 'me') {
          $scope.pendingSentRequestModalShouldBeOpen = true;
        }
      }
    };

    $scope.close = function() {
      $scope.pendingReceivedRequestModalShouldBeOpen = false;
      $scope.pendingSentRequestModalShouldBeOpen = false;
      $scope.pendingGroupRequestModalShouldBeOpen = false;
    }

    $scope.opts = {
      backdropFade: true,
      dialogFade: true
    }

    $scope.getPending();
  }]);
