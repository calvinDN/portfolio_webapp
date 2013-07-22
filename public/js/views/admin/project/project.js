define(function(require, exports, module) {
    var $            = require('jquery'),
        _            = require('underscore'),
        Backbone     = require('Backbone'),
        ResourceView = require('views/admin/project/resource');
        AdminProject = require('text!templates/admin/project/project.html'),
        Project      = require('models/Project');

// this.model is one project from the project collection
module.exports = Backbone.View.extend({
    tagName: "li",
    className: "list-project well",
    initialize: function() {
        this.childViews = [];
        this.resourceViews = [];
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
        this.$el.html(_.template(AdminProject, this.model.toJSON()));
        this.renderCompleted(this.model.get("completed"));
        this.renderResources(this.model);
        return this;
    },

    renderCompleted: function(completed) {
        if (!completed) {
            this.$(".completed").text("not completed");
            this.$(".completed").css("color", "#FF8080");
        }
    },

    renderResources: function(model) {
        var resourceList = model.get("resources");
        for (var i=0; i<resourceList.length; i++) {
            this.resourceViews[i] = (new ResourceView({
                model : resourceList[i]
            }));
            var resourceItemView = this.resourceViews[i].render().el;
            $(resourceItemView).appendTo(this.$(".project-resources"));
            this.childViews.push(resourceItemView);
        }

        if (resourceList.length < 1)
            this.$(".subtitle").remove();
    },

    events : {
        "click #remove-btn" : "removeProject",
        "click #reset-btn"  : "resetProject",
        "click #save-btn"   : "editProject"
    },

    removeProject: function() {
        this.model.url = "/admin/projects/" + this.model.get("_id");
        this.model.destroy({
            success: function(response) {
                console.log('success');
            },
            error: function(response) {
                console.log('error');
            }
        });
    },

    resetProject: function() {
        this.$("#description").val(this.model.get("description"));
        this.$("select").val(this.model.get("completed"));
        _.each(this.resourceViews, function(resourceView) {
            if (resourceView.reset);
                resourceView.reset();
        });
    },

    editProject: function() {
        var updates = {
            description : this.$("#description").val(),
            completed   : this.$("selected").children(':selected').attr('value'),
            resources   : this.getResources()
        };

        this.model.url = "/admin/projects/"+this.model.get("_id");
        this.model.save(updates, {
            success : function(response) {
            },
            error : function(response) {
            }
        });
    },

    getResources: function() {
        // get subview resources
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
