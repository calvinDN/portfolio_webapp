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
        "click .save"  : "saveProject"
    },

    // when .com is entered into resource link
    // fadein('slow') a div for a new resource
    // can probably use $("#client")[0] to loop through them

    saveProject: function (){
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
                setTimeout(function(){
                    this.$("#addProjectForm")[0].reset();
                },1600);
                this.$('.displayAlert').fadeIn('slow').delay(1600).fadeOut('slow');
            },
            error: function(response){
                console.log(response);
            }
        });
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
