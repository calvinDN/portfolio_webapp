define(function(require, exports, module) {
    var $            = require('jquery'),
        _            = require('underscore'),
        Backbone     = require('Backbone'),
        EditTemplate = require('text!templates/admin/project/edit.html'),
        Project      = require('models/Project'),
        Projects     = require('models/ProjectCollection'),
        ProjectView  = require("views/project/project");

module.exports = Backbone.View.extend({

    initialize: function () {
        this.childViews = [];
    },

    render: function () {
        this.$el.html(_.template(EditTemplate));
        return this;
    },

    remove: function () {
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
