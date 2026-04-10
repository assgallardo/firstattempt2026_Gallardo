angular.module('careerPassportApp')
  .controller('ProfileCtrl', ['$scope', 'UserService', function($scope, UserService) {
    
    $scope.user = {
      name: 'John Doe',
      email: 'john@example.com',
      title: 'Software Engineer',
      location: 'San Francisco, CA',
      bio: 'Passionate about building great products',
      skills: ['JavaScript', 'React', 'Node.js', 'AngularJS'],
      experience: [
        { company: 'Tech Corp', position: 'Senior Developer', years: '2020-Present' },
        { company: 'StartUp Inc', position: 'Developer', years: '2018-2020' }
      ]
    };

    $scope.editProfile = function() {
      $scope.isEditing = true;
    };

    $scope.saveProfile = function() {
      UserService.updateProfile($scope.user);
      $scope.isEditing = false;
    };

    $scope.generateCV = function() {
      // Download CV functionality
      console.log('Generating CV...');
    };

  }]);
