define(function(require, exports, module) {
	var $              = require('jquery');
	var _              = require('underscore');
	var Backbone       = require('Backbone');
	var LoginTemplate  = require('text!templates/LoginView.html');

module.exports = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        //$(this.el).html(LoginTemplate);
        this.$el.html(_.template(LoginTemplate));
        return this;
    },

    events: {
        "click .login" : "login"
    },

    login: function () {
        console.log('ready to login');
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
