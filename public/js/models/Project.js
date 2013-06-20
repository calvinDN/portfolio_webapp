define(function(require, exports, module) {
    var Backbone = require('Backbone');

    module.exports = Backbone.Model.extend({

        urlRoot: "/projects",
        initialize: function() {

        },

        validate: function(attrs) {
            console.log(attrs);
            var errstr = [];

            if (!attrs.name)
                errstr.push("project name");

            // may need to do something with images here...

            if (!attrs.description)
                errstr.push("description");

            if (!attrs.github)
                errstr.push("github link");

            // not sure if I can check completed in anyway

            // loop through resources here and error check

        }
    });

});
