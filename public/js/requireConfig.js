require.config({
    paths: {
        jquery      : '/lib/jquery-1.8.2.min',
        underscore  : '/lib/underscore-min',
        Backbone    : '/lib/backbone',
        text        : '/lib/text',
        templates   : '/tpl',
        bootstrap   : '/lib/bootstrap.min'
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
