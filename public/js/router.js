define(function(require, exports, module) {
    var $           = require('jquery'),
        Backbone    = require('Backbone'),
        HomeView    = require('views/home'),
        LoginView   = require('views/login'),
        ProjectView = require('views/project'),
        HeaderView  = require('views/header'),
        Project     = require('models/Project'),
        Projects    = require('models/ProjectCollection');

module.exports = new (Backbone.Router.extend({
    currentView: null,
    routes: {
        ""             : "home",
        "login"        : "login",
        "projects/add" : "addProject"
    },

    initialize: function() {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function(id) {
        this.registerView(new HomeView({
            el: $("#content")
        }));
        this.headerView.selectMenuItem('home-menu');
    },

    login: function() {
        this.registerView(new LoginView({
            el: $("#content")
        }));
        this.headerView.selectMenuItem(); // clear active class from nav
    },

    addProject: function() {
        var projects = new Projects();
        projects.url = "/projects";

        this.registerView(new ProjectView({
            collection: projects,
            el: $("#content")
        }));
        projects.fetch();
        this.headerView.selectMenuItem('add-menu');
    },

    registerView: function(view) {
        if (this.currentView)
            this.currentView.remove();

        this.currentView = view;
        this.currentView.render();
    }

}));

}); // end of module
