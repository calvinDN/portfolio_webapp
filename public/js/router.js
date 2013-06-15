define(function(require, exports, module) {
    var $           = require('jquery');
    var Backbone    = require('Backbone');
    var HomeView    = require('views/home');
    var LoginView   = require('views/login');
    var ProjectView = require('views/project');
    var HeaderView  = require('views/header');

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
        /*if (!this.homeView)
            this.homeView = new HomeView();

        $('#content').html(this.homeView.el);*/
        this.registerView(new HomeView({
            el: $("#content")
        }));
        this.headerView.selectMenuItem('home-menu');
    },

    login: function() {
        /*if (!this.loginView)
            this.loginView = new LoginView();

        $('#content').html(this.loginView.el);*/
        this.registerView(new LoginView({
            el: $("#content")
        }));
        this.headerView.selectMenuItem(); // clear active class from nav
    },

    addProject: function() {
        /*if (!this.projectView)
            this.projectView = new ProjectView();

        $('#content').html(this.projectView.el);*/
        this.registerView(new ProjectView({
            el: $("#content")
        }));
        this.headerView.selectMenuItem('add-menu');
    },

    registerView: function(view) {
        if (this.currentView) {
            this.currentView.remove();

            //if (!$("#content").length)
            //    $("#stage").append("<div id=\"content\"></div>");
        }

        this.currentView = view;
        this.currentView.render();
    }

}));

}); // end of module
