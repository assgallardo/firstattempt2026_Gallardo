angular.module('careerPassportApp')
  .factory('AuthService', ['$q', function($q) {
    
    var service = {
      isAuthenticated: false,
      currentUser: null,

      login: function(email, password) {
        // Simulate login
        this.isAuthenticated = true;
        this.currentUser = {
          email: email,
          name: 'User ' + email
        };
        return $q.when(this.currentUser);
      },

      loginWithGoogle: function() {
        // Simulate Google login
        this.isAuthenticated = true;
        this.currentUser = {
          email: 'user@gmail.com',
          name: 'Google User'
        };
        return $q.when(this.currentUser);
      },

      logout: function() {
        this.isAuthenticated = false;
        this.currentUser = null;
        return $q.when();
      },

      isLoggedIn: function() {
        return this.isAuthenticated;
      }
    };

    return service;
  }]);
