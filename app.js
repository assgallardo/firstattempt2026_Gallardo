(function () {
  "use strict";

  var app = angular.module("careerApp", ["ngRoute"]);

  app.config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when("/login", {
          templateUrl: "views/login.html",
          controller: "LoginController",
        })
        .when("/profile", {
          templateUrl: "views/profile.html",
          controller: "ProfileController",
        })
        .when("/jobs", {
          templateUrl: "views/jobs.html",
          controller: "JobController",
        })
        .otherwise({
          redirectTo: "/login",
        });

      $locationProvider.hashPrefix("!");
    },
  ]);

  app.directive("bottomNav", function () {
    return {
      restrict: "E",
      controller: [
        "$scope",
        "$location",
        function ($scope, $location) {
          $scope.isActive = function (path) {
            return $location.path() === path;
          };
        },
      ],
      template:
        '<div class="fixed bottom-0 left-0 right-0 bg-[#0d2657] border-t border-[#1a5cdb] p-3 z-50 shadow-lg">' +
        '<div class="max-w-2xl mx-auto grid grid-cols-3 gap-2">' +
        '<a href="#!/login" ng-class="isActive(\'/login\') ? \'bg-[#1a5cdb] text-white\' : \'text-blue-100 hover:bg-[#1a3a6b] hover:text-white\'" class="text-center py-2.5 rounded-lg text-sm font-semibold transition-colors">Login</a>' +
        '<a href="#!/profile" ng-class="isActive(\'/profile\') ? \'bg-[#1a5cdb] text-white\' : \'text-blue-100 hover:bg-[#1a3a6b] hover:text-white\'" class="text-center py-2.5 rounded-lg text-sm font-semibold transition-colors">Profile</a>' +
        '<a href="#!/jobs" ng-class="isActive(\'/jobs\') ? \'bg-[#1a5cdb] text-white\' : \'text-blue-100 hover:bg-[#1a3a6b] hover:text-white\'" class="text-center py-2.5 rounded-lg text-sm font-semibold transition-colors">Jobs</a>' +
        "</div></div>",
    };
  });

  app.controller("LoginController", [
    "$scope",
    "$location",
    function ($scope, $location) {
      $scope.selectedTab = "Alumni";
      $scope.loginForm = {
        email: "",
        password: "",
      };

      $scope.login = function () {
        $location.path("/profile");
      };

      $scope.loginWithGoogle = function () {
        $location.path("/profile");
      };

      $scope.showForgotPassword = angular.noop;
      $scope.showSSO = angular.noop;
      $scope.showRequestAccess = angular.noop;
    },
  ]);

  app.controller("ProfileController", [
    "$scope",
    function ($scope) {
      $scope.editMode = false;
      $scope.editSkills = false;

      $scope.user = {
        name: "Alex Johnson",
        title: "Product Strategy Specialist",
        gpa: "3.91",
        avatar:
          "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        connections: 248,
        applications: 14,
        profile: 92,
        skills: [
          "Product Strategy",
          "Data Analysis",
          "SQL",
          "Python",
          "Project Management",
          "UX Research",
        ],
        honors: [
          {
            title: "Dean's List",
            description: "Awarded for 6 consecutive semesters",
            year: "2018-2020",
          },
          {
            title: "Summa Cum Laude",
            description: "Top 1% of graduating class",
            year: "2020",
          },
          {
            title: "National Merit Scholar",
            description: "Academic merit recognition",
            year: "2016",
          },
        ],
        certs: [
          { name: "Google Data Analytics", org: "Google", year: "2022" },
          { name: "AWS Cloud Practitioner", org: "Amazon", year: "2023" },
          { name: "PMP Certification", org: "PMI", year: "2021" },
        ],
      };

      $scope.removeSkill = function (skill) {
        $scope.user.skills = $scope.user.skills.filter(function (s) {
          return s !== skill;
        });
      };

      $scope.generateCV = angular.noop;
      $scope.shareProfile = angular.noop;
    },
  ]);

  app.controller("JobController", [
    "$scope",
    function ($scope) {
      $scope.unreadNotifications = 2;
      $scope.searchQuery = "";
      $scope.selectedDegree = "Any Degree";
      $scope.degreeOptions = ["Any Degree", "Bachelor's", "Master's", "PhD"];

      $scope.jobs = [
        {
          id: 1,
          title: "Senior Product Designer",
          company: "TechFlow Systems",
          location: "San Francisco, CA",
          salary: "$140k-$180k",
          match: 98,
          posted: "2 days ago",
          type: "Full-time",
          logoBg: "#1a2a4a",
          logo:
            "https://images.unsplash.com/photo-1770012977129-19f856a1f935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
          description:
            "Lead product design initiatives across our core platform and collaborate with PMs and engineers.",
          skills: ["UX Research", "Figma", "Product Strategy"],
          degree: "Bachelor's",
          applied: false,
          saved: false,
        },
        {
          id: 2,
          title: "Frontend Engineer (React)",
          company: "Lumina Creative",
          location: "Remote",
          salary: "$120k-$155k",
          match: 92,
          posted: "5 hours ago",
          type: "Contract",
          logoBg: "#0e6b38",
          logo:
            "https://images.unsplash.com/photo-1689267166689-795f4f536819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
          description:
            "Build scalable UI components and collaborate with design on high-fidelity implementation.",
          skills: ["React", "TypeScript", "CSS"],
          degree: "Bachelor's",
          applied: false,
          saved: false,
        },
        {
          id: 3,
          title: "UX Research Lead",
          company: "Blue Knight Corp",
          location: "Austin, TX",
          salary: "$150k-$200k",
          match: 89,
          posted: "1 week ago",
          type: "Full-time",
          logoBg: "#1a4fa0",
          logo:
            "https://images.unsplash.com/photo-1770012977129-19f856a1f935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
          description:
            "Own the research practice for enterprise product suites and guide strategic decisions.",
          skills: ["UX Research", "Data Analysis", "User Testing"],
          degree: "Master's",
          applied: false,
          saved: false,
        },
      ];

      $scope.filteredJobs = $scope.jobs.slice();
      $scope.selectedJob = $scope.filteredJobs[0];

      $scope.updateFilters = function () {
        var q = ($scope.searchQuery || "").toLowerCase();

        $scope.filteredJobs = $scope.jobs.filter(function (job) {
          var matchesSearch =
            !q ||
            job.title.toLowerCase().indexOf(q) > -1 ||
            job.company.toLowerCase().indexOf(q) > -1;
          var matchesDegree =
            $scope.selectedDegree === "Any Degree" ||
            job.degree === $scope.selectedDegree;

          return matchesSearch && matchesDegree;
        });

        if (
          $scope.selectedJob &&
          !$scope.filteredJobs.some(function (job) {
            return job.id === $scope.selectedJob.id;
          })
        ) {
          $scope.selectedJob = $scope.filteredJobs[0] || null;
        }
      };

      $scope.selectJob = function (job) {
        $scope.selectedJob = job;
      };

      $scope.applyJob = function (job) {
        job.applied = true;
      };

      $scope.saveJob = function (job) {
        job.saved = !job.saved;
      };

      $scope.showNotifications = angular.noop;
      $scope.showFilters = angular.noop;
    },
  ]);
})();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (registration) {
        console.log(
          "[ServiceWorker] Registered with scope:",
          registration.scope
        );
      })
      .catch(function (error) {
        console.warn("[ServiceWorker] Registration failed:", error);
      });
  });
}
