angular.module('careerPassportApp')
  .directive('cpButton', function() {
    return {
      restrict: 'E',
      transclude: true,
      template: '<button class="px-4 py-2 rounded font-semibold transition-colors" ng-transclude></button>',
      link: function(scope, element, attrs) {
        var classes = 'bg-blue-500 hover:bg-blue-600 text-white';
        if (attrs.variant === 'outline') {
          classes = 'border border-gray-300 text-gray-700 hover:bg-gray-50';
        }
        element.find('button').addClass(classes);
      }
    };
  });
