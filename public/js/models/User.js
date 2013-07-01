define(function(require, exports, module) {
    var $        = require('jquery'),
    Backbone     = require('Backbone');

    var User = module.exports = Backbone.Model.extend({

        urlRoot: "/users",
        initialize: function() {
        }
    },
    {  // static class properties

        /**
         * Fetches the currently logged in user.
         * @return {User} the currently authenticated user
         */
        getCurrent : function(onDone) {
            $.get(User.prototype.urlRoot + '/me')
            .done(function(data) {
                User.current = new User();
                User.current.set(data);
                if (onDone)
                    onDone(null);
            })
            .fail(function(res, status, error) {
                if (onDone)
                    onDone(res.responseText || error || status);
            });
        },

        /**
         * The user model that describes the currently authenticated user.
         * Null or no user is authenticated.
         * @type {User}
         */
        current : null
    });
});