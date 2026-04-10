angular.module('careerPassportApp')
  .directive('cpCard', function() {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow" ng-transclude></div>'
    };
  });
