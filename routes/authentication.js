var path          = require('path'),
    passport      = require('passport'),
    User          = require(path.resolve('models/User')),
    LocalStrategy = require('passport-local').Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(userModel, done) {
    done(null, userModel.id);
});

passport.deserializeUser(function(userID, done) {
    User.findOne(userID, done);
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            user.comparePassword(password, function(err, isMatch) {
                if (err) return done(err);
                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }
));

module.exports = function(app) {
    // maybe I can call res.send here and send err msg.
    app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/#/login' })
    );

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
};

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
module.exports.ensureAuthentication = function(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/#/login');
};

