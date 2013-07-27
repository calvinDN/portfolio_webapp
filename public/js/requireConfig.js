require.config({
    paths: {
        jquery      : '/lib/jquery-1.8.2.min',
        underscore  : '/lib/underscore.min',
        Backbone    : '/lib/backbone.min',
        text        : '/lib/text',
        bootstrap   : '/lib/bootstrap.min',
        parsley     : '/lib/parsley.min',
        templates   : '/tpl'
    },
    shim: {
        underscore  : {
            exports : '_'
        },
        parsley  : {
            deps : [ "jquery" ]
        },
        bootstrap : {
            deps  : [ "jquery" ]
        },
        Backbone  : {
            deps  : [ "underscore", "jquery" ],
            exports : "Backbone"
        }
    }
});
