var path = require('path'),
    User = require(path.resolve('models/User'));

module.exports = function(app, rootUrl) {

    app.get(rootUrl + '/users/:id', function(req,res) {
        var id = req.params.id;

        if (id == 'me')
            id = req.user.id;

        User.findById(id, function(err, user) {
            if (err)
                return res.send(500);

            if (user === null)
                return res.send(404);

            res.send(200, user);
        });
    });

};