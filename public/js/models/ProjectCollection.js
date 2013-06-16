define(function(require, exports, module) {
    var Backbone = require('Backbone'),
        Project  = require('models/Project');

    module.exports = Backbone.Collection.extend({
        model: Project
    });

});
