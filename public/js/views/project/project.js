define(function(require, exports, module) {
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        ProjectTemplate = require('text!templates/project/ProjectView.html'),
        Project         = require('models/Project');

// this.model is one project from the project collection
module.exports = Backbone.View.extend({
    tagName: "li",
    className: "list-project well",
    initialize: function() {
    },

    render: function() {
        this.$el.html(_.template(ProjectTemplate, this.model.toJSON()));
        this.renderResources(this.model);
        return this;
    },

    renderResources: function(model) {
        var resourceList = model.get("resources");
        // MUSTDO: make this into a template, append to it
        for (var i=0; i<resourceList.length; i++){
            this.$(".project-resources").prepend("<li>"+resourceList[i].name+"</li>"+"<li>"+resourceList[i].description+"</li>"+"<li>"+resourceList[i].link+"</li>");
        }
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
