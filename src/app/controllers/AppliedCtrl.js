angular.module('careerPassportApp')
  .controller('AppliedCtrl', ['$scope', function($scope) {
    
    $scope.applications = [
      {
        id: 1,
        jobTitle: 'Senior Frontend Developer',
        company: 'Tech Corp',
        appliedDate: '2026-04-08',
        status: 'under_review',
        statusLabel: 'Under Review',
        statusClass: 'bg-yellow-100 text-yellow-800'
      },
      {
        id: 2,
        jobTitle: 'Full Stack Developer',
        company: 'StartUp Inc',
        appliedDate: '2026-04-07',
        status: 'rejected',
        statusLabel: 'Rejected',
        statusClass: 'bg-red-100 text-red-800'
      },
      {
        id: 3,
        jobTitle: 'Backend Developer',
        company: 'Cloud Systems',
        appliedDate: '2026-04-05',
        status: 'accepted',
        statusLabel: 'Accepted',
        statusClass: 'bg-green-100 text-green-800'
      }
    ];

    $scope.filterByStatus = function(status) {
      $scope.selectedStatus = status;
    };

    $scope.getFilteredApplications = function() {
      if (!$scope.selectedStatus) {
        return $scope.applications;
      }
      return $scope.applications.filter(function(app) {
        return app.status === $scope.selectedStatus;
      });
    };

  }]);
