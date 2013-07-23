define(function(require, exports, module) {
	var $              = require('jquery'),
        _              = require('underscore'),
        Backbone       = require('Backbone'),
        ErrorTemplate  = require('text!templates/error.html');

module.exports = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        this.$el.html(_.template(ErrorTemplate));
        return this;
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module