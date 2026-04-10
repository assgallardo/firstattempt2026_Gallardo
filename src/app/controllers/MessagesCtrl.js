angular.module('careerPassportApp')
  .controller('MessagesCtrl', ['$scope', function($scope) {
    
    $scope.conversations = [
      {
        id: 1,
        name: 'Alice Johnson',
        avatar: 'AJ',
        lastMessage: 'Sounds great! Let\'s connect soon.',
        unread: 2,
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        name: 'Bob Smith',
        avatar: 'BS',
        lastMessage: 'Thanks for the referral!',
        unread: 0,
        timestamp: '1 day ago'
      }
    ];

    $scope.selectedConversation = null;
    $scope.messageInput = '';

    $scope.selectConversation = function(conversation) {
      $scope.selectedConversation = conversation;
      $scope.messageInput = '';
    };

    $scope.sendMessage = function() {
      if ($scope.messageInput.trim()) {
        console.log('Message sent:', $scope.messageInput);
        $scope.messageInput = '';
      }
    };

  }]);
