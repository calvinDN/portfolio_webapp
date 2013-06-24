define(function(require, exports, module) {
    var $               = require('jquery'),
        Backbone        = require('Backbone'),
        HomeView        = require('views/home'),
        LoginView       = require('views/login'),
        AddProjectView  = require('views/project/add'),
        ListProjectView = require('views/project/list'),
        HeaderView      = require('views/header'),
        ErrorView       = require('views/error'),
        Project         = require('models/Project'),
        Projects        = require('models/ProjectCollection');

module.exports = new (Backbone.Router.extend({
    currentView: null,
    routes: {
        ""             : "home",
        "login"        : "login",
        "projects"     : "listProjects",
        "projects/add" : "addProject",
        ":whatever"    : "notFound"
    },

    initialize: function() {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    notFound: function(trash) {
        this.registerView(new ErrorView({
            el: $("#content")
        }));
        this.headerView.selectMenuItem();
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

        this.registerView(new AddProjectView({
            collection: projects,
            el: $("#content")
        }));
        projects.fetch();
        this.headerView.selectMenuItem('add-menu');
    },

    listProjects: function() {
        var projects = new Projects();
        projects.url = "/projects";

        this.registerView(new ListProjectView({
            collection: projects,
            el: $("#content")
        }));
        projects.fetch();
        this.headerView.selectMenuItem('browse-menu');
    },

    registerView: function(view) {
        if (this.currentView)
            this.currentView.remove();

        this.currentView = view;
        this.currentView.render();
    }

}));

}); // end of module
