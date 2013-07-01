define(function(require, exports, module) {
	var $              = require('jquery');
	var _              = require('underscore');
	var Backbone       = require('Backbone');
	var LoginTemplate  = require('text!templates/LoginView.html');

module.exports = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        this.$el.html(_.template(LoginTemplate, {message: false}));
        return this;
    },

    events: {
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
