var path     = require('path'),
    Project  = require(path.resolve('models/Project')),
    Resource = require(path.resolve('models/Resource'));

module.exports = function(app) {

    app.get("/projects", function(req, res) {
        Project.find( function(err, doc) {
            if (err)
                return res.send(500);

            return res.send(200, doc);
        });
    });

    app.post("/projects", function(req, res) {
        console.log(req.body);
        // Error on save if we submit an empty array
        if (!req.body.resources)
            delete req.body.resources;

        new Project(req.body).save( function(err, doc) {
            if (err)
                return res.send(500);

            return res.send(200, doc);
        });
    });

    app.del("/projects/:id", function(req, res) {
        Project.findByIdAndRemove(req.params.id, function(err, doc) {
            if (err)
                return res.send(500);

            return res.send(200);
        });
    });
};