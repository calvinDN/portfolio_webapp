var path     = require('path'),
    Project  = require(path.resolve('models/Project')),
    Resource = require(path.resolve('models/Resource'));

module.exports = function(app, rootUrl) {

    app.post(rootUrl + "/projects", function(req, res) {
        console.log(req.body);
        // Error on save if an empty array is submitted
        if (!req.body.resources)
            delete req.body.resources;

        new Project(req.body).save( function(err, doc) {
            if (err)
                return res.send(500);

            return res.send(200, doc);
        });
    });

    app.del(rootUrl + "/projects/:id", function(req, res) {
        Project.findByIdAndRemove(req.params.id, function(err, doc) {
            if (err)
                return res.send(500);
        });
        return res.send({ success: true });
    });

    // COULDDO: More efficient to make patch request?
    app.put(rootUrl + '/projects/:id', function(req,res) {
        delete req.body._id; // otherwise, update rejects the change

        Project.findByIdAndUpdate(req.params.id, req.body, function(err, doc) {
            if (err)
                return res.send(500);
        });
        return res.send({ success : true });
    });

};