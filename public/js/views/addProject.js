define(function(require, exports, module) {
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        ProjectTemplate = require('text!templates/AddProjectView.html'),
        Resource        = require('models/Resource'),
        Project         = require('models/Project'),
        Projects        = require('models/ProjectCollection');

module.exports = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        this.$el.html(_.template(ProjectTemplate));
        return this;
    },

    events: {
        "click .save" : "saveProject"
    },

    /*saveProject: function () {
        new Project({
            name        : this.$("#name").val(),
            description : this.$("#description").val()
        }).save(null, {
            wait: true,
            success: function(model, response){
                var v = [];
                v.push(new Resource({
                    name : "resource name 1",
                    link : "my link 1"
                }));
                for (var i=0; i<v.length; i++){
                    v[i].url = "/projects/" + model.get("_id") + "/resources";
                    v[i].save();
                }
                var t = new Resource();
                t.url = "/projects/" + model.get("_id") + "/resources";
                t.save();

            },
            error: function(){
              console.log('error');
            }
        });*/
        /*resources   :
            [
                {
                    name : "resource name 1",
                    link : "my link 1"
                }
            ]*/
    //},

    saveProject: function () {
        new Project({
            name        : "tset1",
            description : "fk"
        }).save();
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
