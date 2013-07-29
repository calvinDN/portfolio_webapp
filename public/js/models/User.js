define(function(require, exports, module) {
    var $        = require('jquery'),
    Backbone     = require('Backbone');

    var User = module.exports = Backbone.Model.extend({

        urlRoot: "/admin/users",
        initialize: function() {
        }
    },
    {
        /**
         * Fetches the currently logged in user.
         */
        getCurrent : function(callback) {
            var user = new User();
            user.url = User.prototype.urlRoot + "/me";
            user.fetch({
                success: function(response, user) {
                    console.log("Current User = " + user.username);
                    User.current = new User();
                    User.current.set(user);
                    if (callback)
                        callback(null);
                },
                error: function(response) {
                    console.log("Current User = null");
                    if (callback)
                        callback(response);
                }
            });
        },

        /**
         * The user model that describes the currently authenticated user.
         * Null or no user is authenticated.
         */
        current : null
    });
});