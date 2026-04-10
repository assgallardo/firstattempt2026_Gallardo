angular.module('careerPassportApp')
  .controller('NetworkCtrl', ['$scope', 'UserService', function($scope, UserService) {
    
    $scope.connections = [
      {
        id: 1,
        name: 'Alice Johnson',
        title: 'Product Manager',
        company: 'Tech Corp',
        avatar: 'AJ',
        connected: true
      },
      {
        id: 2,
        name: 'Bob Smith',
        title: 'UX Designer',
        company: 'StartUp Inc',
        avatar: 'BS',
        connected: false
      }
    ];

    $scope.suggestions = [
      {
        id: 3,
        name: 'Carol Davis',
        title: 'Data Scientist',
        company: 'AI Corp',
        avatar: 'CD',
        mutualConnections: 5
      }
    ];

    $scope.connectUser = function(user) {
      UserService.connectUser(user);
      user.connected = true;
    };

    $scope.removeConnection = function(user) {
      UserService.removeConnection(user);
      user.connected = false;
    };

  }]);
