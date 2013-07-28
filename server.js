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
    settings = require('./settings'),
    argv     = require('optimist')
        .boolean(['w','p']) //wipe, populate
        .argv
    ;

// clc colours
var success = clc.green;
var warn    = clc.yellow;
var info    = clc.blue;
var error   = clc.red;

var app = express();

app.set('port', process.env.PORT || settings.server.port);
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'figure it out' }));
app.use(express.limit('1mb'));  // limit size of uploads to lessen the impact of DoS attempts
// passport
app.use(passport.initialize());
app.use(passport.session());

// serve up CSS compiled from LESS
var lessOptions = {
        once         : true,
        optimization : 2,
        compress     : true
    }
;
app.use('/styles', less(_.extend({ src : __dirname + '/public/styles' }, lessOptions)));

app.use(express.static(path.join(__dirname, '/public')));

// setup the DB
mongoose.connect(settings.server.db, function onMongooseError(err){
    if (err)
		throw err;
    else {
		console.log(success("Success! ") + 'Connected to Mongo DB through Mongoose.');

        // make sure an admin exists
        User.findOne({ username : settings.admin.name }, function(err, user) {
            if (err)
                return console.log(error(err));

            if (user !== null)
                return console.log(user);
            else {
                // No admin exists
                console.log(warn("Admin doesn't exist, adding admin to DB."));
                user = new User();
                user.username = settings.admin.name;
                user.password = settings.admin.password;

                user.save(function(err) {
                    if(err) {
                        console.log(error(err));
                    } else {
                        console.log(success("Success!") + info(" User: " + user.username) + " added to DB.");
                    }
                });
            }
        });
    }

    // SHOULDDO: something with this
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

// authentication for specific API routes
app.all("/admin/*", require('./routes/authentication').ensureAuthentication);

// read the Routes files
var project = require('./routes/projects')(app);
var auth    = require('./routes/authentication')(app);
var	admin   = require('./routes/admin/projects')(app, "/admin");
var user    = require('./routes/admin/users')(app, "/admin");

http.createServer(app).listen(app.get('port'), function () {
    console.log(success("Success! ") + "Server listening on port " + info(app.get('port')) + '.');
});
