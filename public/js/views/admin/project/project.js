define(function(require, exports, module) {
    var $            = require('jquery'),
        _            = require('underscore'),
        Backbone     = require('Backbone'),
        Parsley      = require('parsley'),
        ResourceView = require('views/admin/project/resource'),
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
        // SHOULDDO: get parsleyjs working with divs
        //this.$('#addProjectForm').parsley({inputs: 'input, textarea, select, div.dblclick-edit'});
        //this.$( '#addProjectForm' ).parsley( 'addItem', '#project-github' );
        return this;
    },

    renderCompleted: function(completed) {
        this.$("#completed-edit").find("option[value='"+completed+"']").attr("selected", "selected");
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
        // admin remove
        "click #remove-btn"       : "removeConfirmModal",
        "click #remove-confirm"   : "removeProject",
        // admin reset
        "click #reset-btn"        : "resetConfirmModal",
        "click #reset-confirm"    : "resetProject",
        // admin edit save
        "click #save-btn"         : "validateForm",
        "click #edit-confirm"     : "editProject",

        "dblclick .dblclick-edit" : "addContentEditable"
    },

    addContentEditable: function(e) {
        $(e.currentTarget).attr("contentEditable",true);
        $(e.currentTarget).addClass("editable-bg");
    },

    removeConfirmModal: function() {
        this.$('#remove-modal').modal({});
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

    resetConfirmModal: function() {
        this.$('#reset-modal').modal({});
    },

    resetProject: function() {
        this.$("#project-name").text(this.model.get("name"));
        this.$("#project-github").text(this.model.get("github"));
        this.$("#project-description").text(this.model.get("description"));
        this.$("select").val(this.model.get("completed"));
        _.each(this.resourceViews, function(resourceView) {
            if (resourceView.reset);
                resourceView.reset();
        });
    },

    validateForm: function (e) {
        e.preventDefault();
        this.$('#editProjectForm').parsley('destroy');
        if (this.$('#editProjectForm').parsley('validate')) {
            console.log('ok');
            return this.editConfirmModal();
        }
        console.log('nah');
    },

    editConfirmModal: function() {
        this.$('#edit-modal').modal({});
    },

    editProject: function() {
        // SHOULDDO: probably replacing this...
        this.fetchAnimation();

        var updates = {
            name        : this.$("#project-name").text(),
            github      : this.$("#project-github").text(),
            description : this.$("#project-description").text(),
            completed   : this.$("#completed-edit").children(':selected').attr('value'),
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

    fetchAnimation: function() {
        // SHOULDDO: why does this fuck up on second + call?
        self = this;
        this.$("#loading").ajaxStart(function(){
            self.$("#loading").append($('<img class="center" />').attr('src', 'img/ajax-loader.gif'));
        }).ajaxStop(function(){
            setTimeout(function(){
                self.$("#loading").empty();
            },1000);
            setTimeout(function(){
                self.$("#loading").append("<i id=\"load-success\" class=\"icon-check icon-2x\"></i>");
            },1001);
            setTimeout(function(){
                self.$("#loading").empty();
                self.$("#edit-modal").modal('hide');   
            },2000);
        });
    },

    getResources: function() {
        var subDocuments = [];

        _.each(this.resourceViews, function(resourceView) {
            subDocuments.push(resourceView.get());
        });

        return subDocuments;
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
