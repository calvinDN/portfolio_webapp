var fs       = require('fs'),
    express  = require('express'),
	path     = require('path'),
	http     = require('http'),
	mongoose = require('mongoose'),
    less     = require('less-middleware'),
	clc      = require('cli-color'),
	_        = require('underscore'),
    passport = require('passport'),
    path     = require('path'),
    User     = require(path.resolve('models/User')),
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
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'figure it out' }));
app.use(express.limit('1mb'));  // limit size of uploads to lessen the impact of DoS attempts
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

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
    else {
		console.log(success("Success! ") + 'Connected to Mongo DB through Mongoose.');

        User.findOne({ username : "calvin@calvindn.com" }, function(err, user) {
            if (err)
                return console.log(err);

            if (user !== null)
                return console.log(user);
            else {
                console.log("Adding test admin.");
                user = new User();
                user.username = "calvin@calvindn.com";
                user.password = "secret";

                user.save(function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('user: ' + user.username + " saved.");
                    }
                });
            }
        });
    }

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

// authentication for all API routes
app.all("/admin/*", require('./routes/authentication').ensureAuthentication);

// read the Routes Files
var project = require('./routes/projects')(app);
var auth    = require('./routes/authentication')(app);
var	admin   = require('./routes/admin/projects')(app, "/admin");
var user    = require('./routes/admin/users')(app, "/admin");

http.createServer(app).listen(app.get('port'), function () {
    console.log(success("Success! ") + "Server listening on port " + info(app.get('port')) + '.');
});
