angular.module('careerPassportApp')
  .factory('UserService', ['$q', function($q) {
    
    var users = [];
    var connections = [];

    return {
      getUserById: function(userId) {
        var user = users.find(function(u) { return u.id === userId; });
        return $q.when(user);
      },

      updateProfile: function(user) {
        // Update user profile
        var index = users.findIndex(function(u) { return u.id === user.id; });
        if (index > -1) {
          users[index] = user;
        } else {
          users.push(user);
        }
        return $q.when(user);
      },

      connectUser: function(user) {
        var exists = connections.find(function(c) { return c.id === user.id; });
        if (!exists) {
          connections.push(user);
        }
        return $q.when({ success: true });
      },

      removeConnection: function(user) {
        var index = connections.findIndex(function(c) { return c.id === user.id; });
        if (index > -1) {
          connections.splice(index, 1);
        }
        return $q.when({ success: true });
      },

      getConnections: function() {
        return $q.when(connections);
      },

      searchUsers: function(query) {
        var filtered = users.filter(function(user) {
          return user.name.toLowerCase().includes(query.toLowerCase());
        });
        return $q.when(filtered);
      }
    };
  }]);
