define(function(require, exports, module) {
    var $                = require('jquery'),
        _                = require('underscore'),
        Backbone         = require('Backbone'),
        ResourceTemplate = require('text!templates/admin/project/resource.html');

// this.model is one project from the project collection
module.exports = Backbone.View.extend({
    initialize: function() {
    },

    render: function() {
        this.$el.html(_.template(ResourceTemplate, this.model));
        return this;
    },

    reset: function() {
        this.$("#resource-name").text(this.model.name);
        this.$("#resource-description").text(this.model.description);
        this.$("#resource-link").text(this.model.link);
    },

    get: function() {
        var resource = {};

        resource.name = this.$("#resource-name").text();
        resource.description = this.$("#resource-description").text();
        resource.link = this.$("#resource-link").text();

        return resource;
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module