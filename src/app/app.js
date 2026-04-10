// Career Passport - AngularJS Application
angular.module('careerPassportApp', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $routeProvider
      // Login Page
      .when('/', {
        templateUrl: '/src/app/templates/login.html',
        controller: 'LoginCtrl'
      })
      // Profile Page
      .when('/profile', {
        templateUrl: '/src/app/templates/profile.html',
        controller: 'ProfileCtrl'
      })
      // Job Search Page
      .when('/jobs', {
        templateUrl: '/src/app/templates/job-search.html',
        controller: 'JobSearchCtrl'
      })
      // Network Page
      .when('/network', {
        templateUrl: '/src/app/templates/network.html',
        controller: 'NetworkCtrl'
      })
      // Messages Page
      .when('/messages', {
        templateUrl: '/src/app/templates/messages.html',
        controller: 'MessagesCtrl'
      })
      // Applied Page
      .when('/applied', {
        templateUrl: '/src/app/templates/applied.html',
        controller: 'AppliedCtrl'
      })
      // Default route
      .otherwise({
        redirectTo: '/'
      });

    // Enable HTML5 mode for cleaner URLs (optional)
    // $locationProvider.html5Mode(true);
  }])

  // Application-wide controller
  .controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.currentPage = function(path) {
      return $location.path() === path;
    };
  }]);
