/**
 * Main entry point to the client-side application.
 */
define(function(require, exports, module) {
    var $           = require('jquery'),
        router      = require('router'),
        User        = require('models/User'),
        Header      = require('views/header'),
        Footer      = require('text!templates/footer.html'),
        AdminHeader = require('views/admin/header'),
        AdminFooter = require('text!templates/admin/footer.html');

    $(document).ready(function() {
        User.getCurrent(function() {
            if (User.current === null) {
                this.headerView = new Header();
                $('.header').html(this.headerView.el);
                $('footer').html(Footer);
            }
            else {
                this.headerView = new AdminHeader();
                $('.header').html(this.headerView.el);
                $('footer').html(AdminFooter);
            }
        });

        Backbone.history.start({ pushState: false });
    });
});
