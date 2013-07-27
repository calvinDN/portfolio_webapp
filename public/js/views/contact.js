define(function(require, exports, module) {
	var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        ContactTemplate = require('text!templates/contact-modal.html');

module.exports = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        this.$el.html(_.template(ContactTemplate));
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