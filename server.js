var fs       = require('fs'),
    express  = require('express'),
	path     = require('path'),
	http     = require('http'),
	mongoose = require('mongoose'),
	clc      = require('cli-color'),
	_        = require('underscore');

// settings
// SHOULDDO: read from external config file
var port = 8000;
var dbPath = "mongodb://localhost/calvindn";

var app = express();

app.set('port', process.env.PORT || port);
app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser());
app.use(express.limit('1mb'));  // limit size of uploads to lessen the impact of DoS attempts
app.use(express.static(path.join(__dirname, '/public')));

// setup the DB
mongoose.connect(dbPath, function onMongooseError(err){
    if(err)
		throw err;
    else
		console.log(clc.green("Success! ") + 'Connected to Mongo DB through Mongoose.');
});

// require model files
fs.readdirSync('models').forEach(function(file) {
    var filename = file.substr(0, file.indexOf('.'));
    require('./models/' + filename);
});

// read the Routes Files
var	project  = require('./routes/projects')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log(clc.green("Success! ") + "Server listening on port " + clc.blue(app.get('port')) + '.');
});
