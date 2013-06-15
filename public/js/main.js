/**
 * Main entry point to the client-side application.
 */
define(function(require, exports, module) {
    var $          = require('jquery');
    var router     = require('router');
    var HeaderView = require('views/header');
    var HomeView   = require('views/home');

    $(document).ready(function() {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);

        Backbone.history.start({ pushState: false });
    });
});
