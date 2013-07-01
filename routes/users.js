var path = require('path'),
    User = require(path.resolve('models/User'));

module.exports = function(app, rootUrl) {

    app.get(rootUrl + '/users/:id', function(req,res) {
        var id = req.params.id;
        User.findById(id, function(err, user) {
            if (err)
                return res.send(500);

            res.send(user);
        });
    });
}