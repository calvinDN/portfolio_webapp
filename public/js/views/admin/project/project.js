define(function(require, exports, module) {
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        ResourceView    = require('views/project/resource');
        ProjectTemplate = require('text!templates/admin/project/project.html'),
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
        this.renderCompleted(this.model.get("completed"));
        this.renderResources(this.model);
        return this;
    },

    // MUSTDO: More subtle colours
    renderCompleted: function(completed) {
        if (!completed) {
            this.$(".completed").text("not completed");
            this.$(".completed").css("color", "#FF8080");
        }
    },

    renderResources: function(model) {
        var resourceList = model.get("resources");
        for (var i=0; i<resourceList.length; i++){
            var resourceItemView = (new ResourceView({
                model : resourceList[i]
            })).render().el;
            $(resourceItemView).appendTo(this.$(".project-resources"));
            this.childViews.push(resourceItemView);
        }

        if (resourceList.length < 1)
            this.$(".subtitle").remove();
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
