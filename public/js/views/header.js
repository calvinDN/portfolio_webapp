define(function(require, exports, module) {
    var $              = require('jquery');
    var _              = require('underscore');
    var Bootstrap      = require('bootstrap');
    var Backbone       = require('Backbone');
    var HeaderTemplate = require('text!templates/HeaderView.html');

module.exports = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(_.template(HeaderTemplate));
        return this;
    },

    events: {
        "click .contact-menu" : "contactModal",
        "click .modal-submit" : "submitMessage"
    },

    contactModal: function(){
        // COULDDO: Fix position on small browser size
        this.$('#contact-modal').modal({}).css(
        {
            width: '250px',
            'margin-left': function () {
                return -($(this).width() / 2);
            }
        });
    },

    selectMenuItem: function (menuItem) {
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
