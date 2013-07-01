/**
 * Main entry point to the client-side application.
 */
define(function(require, exports, module) {
    var $           = require('jquery'),
        router      = require('router'),
        User        = require('models/User'),
        Header      = require('views/header'),
        AdminHeader = require('views/admin/header');

    $(document).ready(function() {

        User.getCurrent(function() {
            if (User.current == null) {
                this.headerView = new Header();
                $('.header').html(this.headerView.el);
            }
            else {
                this.headerView = new AdminHeader();
                $('.header').html(this.headerView.el);
            }
        });

        Backbone.history.start({ pushState: false });
    });
});
