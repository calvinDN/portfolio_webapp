define(function(require, exports, module) {
	var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        Parsley         = require('parsley'),
        ContactTemplate = require('text!templates/contact-modal.html');

module.exports = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        this.$el.html(_.template(ContactTemplate));
        return this;
    },

    events: {
        "click .contact-submit" : "validateForm"
    },

    validateForm: function (e) {
        e.preventDefault();
        $('#contactForm').parsley('destroy');
        if ($('#contactForm').parsley('validate'))
            return this.submit();

    },

    submit: function() {
        var form = {
            name    : this.$("#contact-name").val(),
            email   : this.$("#contact-email").val(),
            message : this.$("#contact-msg").val(),
            client  : this.$("#contact-client").is(':checked')
        };

        var self = this;
        $.post("/contact", form)
        .done(function() {
            self.$("#outcome").append("Success!");
            setTimeout(function() {
                $('#contact-modal').modal('hide');
                self.$("#outcome").empty();
                self.$('#contactForm').parsley('destroy');
                self.$("#contactForm")[0].reset();
            },600);
        })
        .fail(function() {
            self.$("#outcome").append("Something went wrong!");
        });

    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module