define(function(require, exports, module) {
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        ProjectTemplate = require('text!templates/AddProjectView.html'),
        Project         = require('models/Project'),
        Projects        = require('models/ProjectCollection');

module.exports = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        this.$el.html(_.template(ProjectTemplate));
        return this;
    },

    events: {
        "click .save" : "saveProject"
    },

    saveProject: function () {
        new Project({
            name        : this.$("#name").val(),
            description : this.$("#description").val()
        }).save();
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
