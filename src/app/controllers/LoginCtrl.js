angular.module('careerPassportApp')
  .controller('LoginCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    
    $scope.loginForm = {
      email: '',
      password: ''
    };

    $scope.login = function() {
      if ($scope.loginForm.email && $scope.loginForm.password) {
        AuthService.login($scope.loginForm.email, $scope.loginForm.password);
        $location.path('/jobs');
      }
    };

    $scope.loginWithGoogle = function() {
      AuthService.loginWithGoogle();
      $location.path('/jobs');
    };

    $scope.signup = function() {
      $location.path('/profile');
    };

  }]);
