define(function(require, exports, module) {
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        ProjectTemplate = require('text!templates/ListItemProjectView.html'),
        Project         = require('models/Project');

// this.model is one project from the project collection
module.exports = Backbone.View.extend({
    tagName: "li",
    initialize: function () {
    },

    render: function () {
        this.$el.html(_.template(ProjectTemplate, this.model.toJSON()));
        return this;
    },

    remove: function () {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
