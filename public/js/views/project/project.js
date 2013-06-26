define(function(require, exports, module) {
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        ResourceView    = require('views/project/resource');
        ProjectTemplate = require('text!templates/project/ProjectView.html'),
        Project         = require('models/Project');

// this.model is one project from the project collection
module.exports = Backbone.View.extend({
    tagName: "li",
    className: "list-project well",
    initialize: function() {
        this.childViews = [];
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
            //this.$(".project-resources").prepend("<li>"+resourceList[i].name+"</li>"+"<li>"+resourceList[i].description+"</li>"+"<li>"+resourceList[i].link+"</li>");
            var resourceItemView = (new ResourceView({
                model : resourceList[i]
            })).render().el;
            $(resourceItemView).appendTo(this.$(".project-resources"));
            this.childViews.push(resourceItemView);
        }

        if (resourceList.length < 1)
            this.$(".project-resources").append("<br>None.");
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();

        _.each(this.childViews, function(childView){
            if (childView.remove)
                childView.remove();
        });

        return this;
    }

});

}); // end of module
