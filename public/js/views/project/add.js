define(function(require, exports, module){
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
    initialize: function (){
        this.resources = 0; // number of resources added to project
    },

    render: function (){
        this.$el.html(_.template(ProjectTemplate));
        this.appendResourceHtml();
        return this;
    },

    events: {
        "click .add-resource" : "appendResourceHtml",
        "click .save"         : "validateForm",
        "click .close"        : "closeAlert",
        "click .clear"        : "clearForm"
    },

    // can probably use $("#client")[0] to loop through them
    //
    // VALIDATION / ALERTS IS A FUCKING MESS IN HERE

    appendResourceHtml: function(e) {
        if (typeof e != "undefined")
            e.preventDefault();
        // COULDDO: add a seperate view for resources
        this.resources++;
        this.$(".resourceList-append").append(_.template(newResource, {number: this.resources}));
    },

    removeResourceHtml: function() {
        var len = this.resources;
        for (var i=1; i < len+1; i++){
            this.$("#resource-"+i).remove();
            this.resources--;
        }
    },

    validateForm: function (){
        if (this.$('#addProjectForm').parsley( 'validate' ))
            return this.saveProject();

        return this.$('.alert').animate({opacity:0});
    },

    saveProject: function (){
        var self = this;

        var resourceList = [];
        this.gatherResources(resourceList);
        console.log(resourceList);

        new Project({
            name        : this.$("#name").val(),
            description : this.$("#description").val(),
            github      : "https://github.com/calvinDN/"+this.$("#github").val(),
            completed   : this.$('#completed').is(":checked"),
            resources   : resourceList
        }).save(null, {
            wait: true,
            success: function(response, model){
                console.log(model);
                if (self.$('.alert').css('opacity') == 1)
                    self.$('.alert').css({opacity:0});

                setTimeout(function(){
                    self.$( '#addProjectForm' ).parsley( 'destroy' );
                    self.$("#addProjectForm")[0].reset();
                    self.removeResourceHtml();
                },1600);
                self.updateAlert('alert-success');
                // SHOULDDO: Add self code to updateAlert
                self.$('.alert').html('<a class="close">✕</a><strong>Success!</strong> Project added to database.');
                self.$('.alert').animate({opacity:1});
            },
            error: function(response){
                // MUSTDO: Investigate if this alert is being displayed correctly
                console.log(response);
                if (self.$('.alert').css('opacity') == 1)
                    self.$('.alert').css({opacity:0});
                self.updateAlert('alert-error');
                self.$('.alert').html('<a class="close">✕</a><strong>Error!</strong> Something went wrong.');
                self.$('.alert').animate({opacity:1});
            }
        });
    },

    updateAlert: function(newClass){
        this.$('.alert').removeClass('alert-success').removeClass('alert-error').removeClass('alert-warn').addClass(newClass);
    },

    closeAlert: function (e){
        this.$(e.target).closest('.alert').animate({opacity:0});
        //this.$('.alert').animate({opacity:0});
    },

    clearForm: function (){
        this.$( '#addProjectForm' ).parsley( 'destroy' );
        this.$('.alert').animate({opacity:0});
        this.removeResourceHtml();
        //this.closeAlert();
    },

    // MUSTDO: this function needs to be updated
    gatherResources: function(resourceList){
        for (var i=1; i < this.resources+1; i++){
            var item = new Resource({
                    name        : this.$("#resourceName-"+i).val(),
                    link        : this.$("#resourceLink-"+i).val(),
                    description : this.$("#resourceDesc-"+i).val()
                });
            resourceList.push(item);
        }
    },

    gatherImages: function(images){

    },

    remove: function(){
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
