require.config({
    paths: {
        jquery      : '/lib/jquery-1.8.2.min',
        underscore  : '/lib/underscore.min',
        Backbone    : '/lib/backbone.min',
        text        : '/lib/text',
        bootstrap   : '/lib/bootstrap.min',
        templates   : '/tpl',
        // SHOULDDO: download and host own copy to remove external dependency
        filepicker  : 'http://api.filepicker.io/v1/filepicker'
    },
    shim: {
        underscore : {
            exports : '_'
        },
        filepicker : {
            exports : 'filepicker'
        },
        Backbone  : {
            deps  : [ "underscore", "jquery" ],
            exports : "Backbone"
        }
    }
});
