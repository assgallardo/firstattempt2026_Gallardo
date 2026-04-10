angular.module('careerPassportApp')
  .controller('JobSearchCtrl', ['$scope', 'JobService', function($scope, JobService) {
    
    $scope.jobs = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        salary: '$150,000 - $200,000',
        description: 'We are looking for a senior frontend developer with 5+ years of experience.',
        tags: ['React', 'TypeScript', 'Remote']
      },
      {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartUp Inc',
        location: 'New York, NY',
        salary: '$120,000 - $150,000',
        description: 'Join our remote team to build amazing products.',
        tags: ['Node.js', 'React', 'MongoDB']
      }
    ];

    $scope.filters = {
      search: '',
      location: '',
      salary: ''
    };

    $scope.applyForJob = function(job) {
      JobService.applyForJob(job);
      alert('Application submitted for ' + job.title);
    };

    $scope.saveJob = function(job) {
      JobService.saveJob(job);
      job.saved = true;
    };

    $scope.searchJobs = function() {
      // Filter jobs based on search criteria
      console.log('Searching for jobs...');
    };

  }]);
