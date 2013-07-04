define(function(require, exports, module) {
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        Parsley         = require('parsley'),
        ProjectTemplate = require('text!templates/project/AddView.html'),
        newResource     = require('text!templates/project/newResource.html'),
        Resource        = require('models/Resource'),
        Project         = require('models/Project'),
        Projects        = require('models/ProjectCollection');

module.exports = Backbone.View.extend({

    initialize: function () {
        this.resources = 0; // number of resources added to project
    },

    render: function () {
        this.$el.html(_.template(ProjectTemplate));
        return this;
    },

    events: {
        "click .add-resource" : "appendResourceHtml",
        "click .save"         : "validateForm",
        "click .close"        : "closeAlert",
        "click .clear"        : "clearForm",
        "click .remove-rsc"   : "removeResourceHtml"
    },

    appendResourceHtml: function(e) {
        if (typeof e != "undefined")
            e.preventDefault();
        // COULDDO: add a seperate view for resources
        this.resources++;
        this.$(".resourceList-append").append(_.template(newResource, {number: this.resources}));
    },

    clearResourceHtml: function() {
        var len = this.resources;
        for (var i=1; i < len+1; i++){
            this.$(".resource-"+i).remove();
            this.resources--;
        }
    },

    removeResourceHtml: function(e) {
        $("."+e.target.classList[4]).remove();
    },

    validateForm: function (e) {
        e.preventDefault();
        this.$( '#addProjectForm' ).parsley( 'destroy' );
        if (this.$('#addProjectForm').parsley( 'validate' ))
            return this.saveProject();

        this.toggleAlert(0);
    },

    saveProject: function () {
        var self = this;

        var resourceList = [];
        this.gatherResources(resourceList);

        // MUSTDO: fix this, first add doesnt work
        var project = new Project();
        project.url = "/admin/projects/";
        project.set({
            name        : this.$("#name").val(),
            description : this.$("#description").val(),
            github      : "https://github.com/calvinDN/"+this.$("#github").val(),
            completed   : this.$('#completed').is(":checked"),
            resources   : resourceList
        }).save(null, {
            success: function(response, model) {
                console.log(response);

                self.toggleAlert(0);

                setTimeout(function() {
                    self.clearForm();
                },1400);
                self.updateAlert('alert-success');
            },
            error: function(response) {
                console.log(response);
                self.toggleAlert(0);
                self.updateAlert('alert-error');
            }
        });
    },

    updateAlert: function(newClass) {
        this.$('.alert')
        .removeClass('alert-success')
        .removeClass('alert-error')
        .addClass(newClass);

        this.displayAlert(newClass);
    },

    displayAlert: function(newClass) {
        if (newClass === 'alert-success')
            this.$('.alert').html('<a class="close">✕</a><strong>Success!</strong> Project added to database.');
        else
            this.$('.alert').html('<a class="close">✕</a><strong>Error!</strong> Something went wrong.');

        this.toggleAlert(1);
    },

    toggleAlert: function(alertOpacity) {
        this.$('.alert').animate({opacity: alertOpacity});
    },

    closeAlert: function (e) {
        this.$(e.target).closest('.alert').animate({opacity:0});
    },

    clearForm: function (e) {
        this.$( '#addProjectForm' ).parsley( 'destroy' );
        $("#addProjectForm")[0].reset();
        this.clearResourceHtml();

        if (typeof e === "undefined") // if not button press dont clear
            this.toggleAlert(1);
        else
            this.toggleAlert(0);
    },

    gatherResources: function(resourceList) {
        for (var i=1; i < this.resources+1; i++){
            if ($(".resource-"+i)[0]){
                var item = new Resource({
                        name        : this.$("#resourceName-"+i).val(),
                        link        : this.$("#resourceLink-"+i).val(),
                        description : this.$("#resourceDesc-"+i).val()
                    });
                resourceList.push(item);
            }
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
