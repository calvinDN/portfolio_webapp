require.config({
    paths: {
        jquery      : '/lib/jquery-1.8.2.min',
        underscore  : '/lib/underscore.min',
        Backbone    : '/lib/backbone.min',
        text        : '/lib/text',
        bootstrap   : '/lib/bootstrap.min',
        templates   : '/tpl'
    },
    shim: {
        underscore : {
            exports : '_'
        },
        Backbone  : {
            deps  : [ "underscore", "jquery" ],
            exports : "Backbone"
        }
    }
});
