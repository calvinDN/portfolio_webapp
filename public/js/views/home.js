define(function(require, exports, module) {
	var $              = require('jquery');
	var _              = require('underscore');
	var Backbone       = require('Backbone');
	var HomeTemplate   = require('text!templates/HomeView.html');

module.exports = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        //$(this.el).html(HomeTemplate);
        this.$el.html(_.template(HomeTemplate));
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