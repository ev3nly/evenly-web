'use strict';

angular.module('evenlyApp')
  .controller('IosDownloadCtrl', ['$scope', 'Uri', '$location', function ($scope, Uri, $location) {
    var params = Uri.getVariables(window.location.href);
    $scope.beta = !!params.beta;

    $scope.betaOptions = [
      'ios-v0.2.6b3',
      'ios-v0.2.7b1',
      'ios-v0.2.8b1'
    ];

    $scope.selectedBetaOption = 'ios-v0.2.8b1';

    $scope.selectBetaOption = function(index) {
      $scope.selectedBetaOption = $scope.betaOptions[index];
    };

    $scope.selectedbetaOptionUrl = function() {
      return "itms-services://?action=download-manifest&url=" +
        window.location.protocol + "//" + window.location.host + "/mobile/ios/" +
        $scope.selectedBetaOption + ".plist";
    };
  }]);
