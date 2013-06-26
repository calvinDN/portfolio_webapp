define(function(require, exports, module) {
    var Backbone = require('Backbone');

    module.exports = Backbone.Model.extend({

        urlRoot: "/projects",
        initialize: function () {

        },
        defaults: {
            name : null,
            link : null,
            description : null
        }
    });

});
