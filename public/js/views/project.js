define(function(require, exports, module) {
    var $               = require('jquery');
    var _               = require('underscore');
    var Backbone        = require('Backbone');
    var ProjectTemplate = require('text!templates/ProjectView.html');

module.exports = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        //$(this.el).html(ProjectTemplate);
        this.$el.html(_.template(ProjectTemplate));
        return this;
    },

    events: {
        "click .save" : "saveProject"
    },

    saveProject: function () {
        console.log('ready to save');
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
