var fs       = require('fs'),
    express  = require('express'),
	path     = require('path'),
	http     = require('http'),
	mongoose = require('mongoose'),
    less     = require('less-middleware'),
	clc      = require('cli-color'),
	_        = require('underscore'),
    argv     = require('optimist')
        .boolean(['w','p']) //wipe, populate
        .argv
    ;
// settings
// SHOULDDO: read from external config file
var port = 8000;
var dbPath = "mongodb://localhost/calvindn";

// colors
var success = clc.green;
var warn    = clc.yellow;
var info    = clc.blue;

var app = express();

app.set('port', process.env.PORT || port);
app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser());
app.use(express.limit('1mb'));  // limit size of uploads to lessen the impact of DoS attempts

// serve up CSS compiled from LESS
var lessOptions =
    { // production LESS options
        once         : true,
        optimization : 2,
        compress     : true
    }
;
app.use('/styles', less(_.extend({ src : __dirname + '/public/styles' }, lessOptions)));

app.use(express.static(path.join(__dirname, '/public')));

// setup the DB
mongoose.connect(dbPath, function onMongooseError(err){
    if (err)
		throw err;
    else
		console.log(success("Success! ") + 'Connected to Mongo DB through Mongoose.');

    if (argv.c)
        console.log(warn("-w Wiping database."));
    if (argv.p)
        console.log(info("-p Populating database."));
});

// require model files
fs.readdirSync('models').forEach(function(file) {
    var filename = file.substr(0, file.indexOf('.'));
    require('./models/' + filename);
});

// read the Routes Files
var	project  = require('./routes/projects')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log(success("Success! ") + "Server listening on port " + info(app.get('port')) + '.');
});
