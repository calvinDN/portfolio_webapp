define(function(require, exports, module) {
    var Backbone = require('Backbone');

    module.exports = Backbone.Model.extend({

        urlRoot: "/projects",
        idAttribute: "_id",
        initialize: function () {

        },

        defaults: {
            _id: null
        }
    });

});
