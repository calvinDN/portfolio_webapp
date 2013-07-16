define(function(require, exports, module) {
    var $           = require('jquery'),
        Backbone    = require('Backbone'),
        Home        = require('views/home'),
        Login       = require('views/login'),
        EditProject = require('views/admin/project/edit'),
        AddProject  = require('views/project/add'),
        ListProject = require('views/project/list'),
        Header      = require('views/header'),
        Error       = require('views/error'),
        User        = require('models/User'),
        Project     = require('models/Project'),
        Projects    = require('models/ProjectCollection');

module.exports = new (Backbone.Router.extend({
    currentView: null,
    routes: {
        ""              : "home",
        "login"         : "login",
        "projects"      : "listProjects",
        "projects/add"  : "addProject",
        "projects/edit" : "editProject",
        ":whatever"     : "notFound"
    },

    initialize: function() {
        this.headerView = new Header();
        $('.header').html(this.headerView.el);
    },

    notFound: function(trash) {
        this.registerView(new Error({
            el: $("#content")
        }), false);
        this.headerView.selectMenuItem();
    },

    home: function(id) {
        this.registerView(new Home({
            el: $("#content")
        }), false);
        this.headerView.selectMenuItem('home-menu');
    },

    login: function() {
        this.registerView(new Login({
            el: $("#content")
        }), false);
        this.headerView.selectMenuItem(); // clear active class from nav
    },

    addProject: function() {
        var projects = new Projects();
        projects.url = "/projects";

        this.registerView(new AddProject({
            collection: projects,
            el: $("#content")
        }), true);
        projects.fetch(); // COULDDO: do I need this?
    },

    editProject: function() {
        var projects = new Projects();
        projects.url = "/projects";

        this.registerView(new EditProject({
            collection: projects,
            el: $("#content")
        }), false);
        projects.fetch();
    },

    listProjects: function() {
        var projects = new Projects();
        projects.url = "/projects";

        this.registerView(new ListProject({
            collection: projects,
            el: $("#content")
        }), false);
        projects.fetch();
        this.headerView.selectMenuItem('browse-menu');
    },

    adminCheck: function(view) {
        var self = this;
        User.getCurrent(function() {
            if (User.current === null) {
                self.notFound();
            }
            else {
                self.registerView(view, false);
            }
        });
    },

    registerView: function(view, adminOnly) {
        if (adminOnly){
            this.adminCheck(view);
        }
        else {
            if (this.currentView)
                this.currentView.remove();

            this.currentView = view;
            this.currentView.render();
        }
    }

}));

}); // end of module
