angular.module('careerPassportApp')
  .factory('JobService', ['$q', function($q) {
    
    var jobs = [];
    var savedJobs = [];
    var applications = [];

    return {
      getAllJobs: function() {
        return $q.when(jobs);
      },

      getJobById: function(jobId) {
        var job = jobs.find(function(j) { return j.id === jobId; });
        return $q.when(job);
      },

      searchJobs: function(query) {
        var filtered = jobs.filter(function(job) {
          return job.title.toLowerCase().includes(query.toLowerCase()) ||
                 job.company.toLowerCase().includes(query.toLowerCase());
        });
        return $q.when(filtered);
      },

      applyForJob: function(job) {
        applications.push({
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          appliedDate: new Date(),
          status: 'pending'
        });
        return $q.when({ success: true });
      },

      saveJob: function(job) {
        var exists = savedJobs.find(function(j) { return j.id === job.id; });
        if (!exists) {
          savedJobs.push(job);
        }
        return $q.when({ success: true });
      },

      getSavedJobs: function() {
        return $q.when(savedJobs);
      },

      getApplications: function() {
        return $q.when(applications);
      }
    };
  }]);
