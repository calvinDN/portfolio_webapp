define(function(require, exports, module){
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        ProjectTemplate = require('text!templates/AddProjectView.html'),
        Resource        = require('models/Resource'),
        Project         = require('models/Project'),
        Projects        = require('models/ProjectCollection');

module.exports = Backbone.View.extend({
    initialize: function (){

    },

    render: function (){
        this.$el.html(_.template(ProjectTemplate));
        return this;
    },

    events: {
        "click .save"  : "saveProject",
        "click .close" : "closeAlert"
    },

    // when .com is entered into resource link
    // fadein('slow') a div for a new resource
    // can probably use $("#client")[0] to loop through them
    //
    // may be better to only fadein success alert and allow user to close
    // it and then fadeout

    saveProject: function (){
        var self = this;

        var resources = [];
        this.gatherResources(resources);

        var images = [];
        this.gatherImages(images);

        new Project({
            name        : this.$("#name").val(),
            images      : images,
            description : this.$("#description").val(),
            github      : this.$("#github").val(),
            completed   : this.$('#completed').is(":checked"),
            resources   : resources
        }).save(null, {
            wait: true,
            success: function(response, model){
                if (this.$('.alert').css('opacity') == 1)
                    this.$('.alert').css({opacity:0});

                setTimeout(function(){
                    this.$("#addProjectForm")[0].reset();
                },1600);
                self.updateAlert('alert-success');
                console.log('here');
                // SHOULDDO: Add this code to updateAlert
                this.$('.alert').html('<a class="close">✕</a><strong>Success!</strong> Project added to database.');
                this.$('.alert').animate({opacity:1});
            },
            error: function(response){
                if (this.$('.alert').css('opacity') == 1)
                    this.$('.alert').css({opacity:0});
                self.updateAlert('alert-error');
                this.$('.alert').html('<a class="close">✕</a><strong>Error!</strong> Something went wrong.');
                this.$('.alert').animate({opacity:1});
            }
        });
    },

    updateAlert: function(newClass){
        this.$('.alert').removeClass('alert-success').removeClass('alert-error').removeClass('alert-warn').addClass(newClass);
    },

    closeAlert: function (e){
        this.$(e.target).closest('.alert').animate({opacity:0});
    },

    gatherResources: function(resources){
        var i=1;
        var item = new Resource({
                name        : this.$("#resourceName-"+i).val(),
                link        : this.$("#resourceLink-"+i).val(),
                description : this.$("#resourceDesc-"+i).val()
            });
        resources.push(item);
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
