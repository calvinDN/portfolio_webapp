define(function(require, exports, module) {
    var $              = require('jquery'),
        _              = require('underscore'),
        Bootstrap      = require('bootstrap'),
        Backbone       = require('Backbone'),
        ContactModal   = require('views/contact'),
        HeaderTemplate = require('text!templates/admin/HeaderView.html');

module.exports = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(_.template(HeaderTemplate));
        this.renderContactModal();
        return this;
    },

    renderContactModal: function() {
        // SHOULDDO: add this to child views
        var contactView = new ContactModal({}).render().el;
        $(contactView).appendTo(this.$("#contact-modal"));
    },

    events: {
        "click .contact-menu" : "contactModal",
        "click .modal-submit" : "submitMessage",
        "click #style-toggle" : "toggleStyle"
    },

    contactModal: function() {
        // COULDDO: Fix position on small browser size
        this.$('#contact-modal').modal({}).css(
        {
            width: '250px',
            'margin-left': function () {
                return -($(this).width() / 2);
            }
        });
    },

    toggleStyle: function() {
    },

    reloadStylesheets: function() {
        var queryString = '?reload=' + new Date().getTime();
        $('link[rel="stylesheet"]').each(function () {
            this.href = this.href.replace(/\?.*|$/, queryString);
        });
    },

    selectMenuItem: function(menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    },

    submitMessage: function() {
        // send message
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
