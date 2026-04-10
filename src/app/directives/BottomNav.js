angular.module('careerPassportApp')
  .directive('bottomNav', ['$location', function($location) {
    return {
      restrict: 'E',
      template: `
        <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around md:hidden">
          <a ng-href="#!/jobs" class="flex flex-col items-center p-2 rounded" ng-class="{active: isActive('/jobs')}">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15a23.931 23.931 0 01-9-1.745M12 21h9m-9 0H3m9 0a9 9 0 01-9-9m18 0a9 9 0 01-9 9m0-13.5a3 3 0 01-3 3H6.75A3 3 0 013.75 9m0 0H0"></path>
            </svg>
            <span class="text-xs mt-1">Jobs</span>
          </a>
          <a ng-href="#!/network" class="flex flex-col items-center p-2 rounded" ng-class="{active: isActive('/network')}">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm6-13.5a3 3 0 110 6 3 3 0 010-6z"></path>
            </svg>
            <span class="text-xs mt-1">Network</span>
          </a>
          <a ng-href="#!/messages" class="flex flex-col items-center p-2 rounded" ng-class="{active: isActive('/messages')}">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span class="text-xs mt-1">Messages</span>
          </a>
          <a ng-href="#!/profile" class="flex flex-col items-center p-2 rounded" ng-class="{active: isActive('/profile')}">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="text-xs mt-1">Profile</span>
          </a>
        </div>
      `,
      link: function(scope, element, attrs) {
        scope.isActive = function(path) {
          return $location.path() === path;
        };
      }
    };
  }]);
