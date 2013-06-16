define(function(require, exports, module) {
    var $               = require('jquery');
    var _               = require('underscore');
    var Backbone        = require('Backbone');
    var ProjectTemplate = require('text!templates/ProjectView.html');
    var Project         = require('models/Project');
    var Projects        = require('models/ProjectCollection');

module.exports = Backbone.View.extend({

    initialize: function () {
        console.log("project view");
        console.log(this.collection);
        this.render();
    },

    render: function () {
        this.$el.html(_.template(ProjectTemplate));
        return this;
    },

    events: {
        "click .save" : "saveProject"
    },

    saveProject: function () {
        new Project({
            name        : "Test",
            last_commit : new Date(),
            completed   : true,
            description : "does this work?"
        }).save();
        //this.collection.push(newProject);
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
