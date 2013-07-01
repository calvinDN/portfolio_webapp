var path          = require('path'),
    passport      = require('passport'),
    User          = require(path.resolve('models/User')),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

module.exports = function(app) {
    app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: false })
    );

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });
};

/**
 * Middleware that ensures the request is authenticated.
 * Add infront of any routes that need authentication.
 */
module.exports.ensureAuthentication = function(req, res, next) {
    // first check for session cookie
    if (req.isAuthenticated())
        return next();

    // check for authorization header
    else if (req.headers.authorization === "undefined" && req.headers['x-requested-with'] == 'XMLHttpRequest') {
        res.send(401, "Unauthorized");
        // specifically don't send the WWW-Authorization header in an attempt to prevent the browser from popping up native login dialog
        // this is only when it's an AJAX request (as indicated by the x-requested-with header)
        // without this header, it's likely the browser hitting up the URL directly so allow standard behaviour which popups authentcation dialog
    }

    // COULDDO: check against basic Auth header (when username/password authentication is supported)
/*    else if
         express.basicAuth(User.authenticate)(req, res, next);
*/
    else
        res.send(401, "Unauthorized");
};
