define(function(require, exports, module) {
	var $              = require('jquery'),
        _              = require('underscore'),
        Backbone       = require('Backbone'),
        HomeTemplate   = require('text!templates/HomeView.html');

module.exports = Backbone.View.extend({

    initialize: function() {
        // this should run as a cron job and fetch latest commits on the server.
        /*var self = this;
        $.get('https://api.github.com/repos/calvinDN/project_euler/commits', function(data) {
            console.log(data);
            self.appendCommits(data);
        });

        $.get('https://api.github.com/users/calvinDN/repos', function(data) {
            for (var i=0; i< data.length; i++)
                console.log(data[i].name);
        });*/
    },

    render: function() {
        this.$el.html(_.template(HomeTemplate));
        return this;
    },

    appendCommits: function(data) {
        for (var i=0; i<data.length; i++) {
            this.$(".github-commits").append(data[i].commit.message+'<br>');
        }
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module