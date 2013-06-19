var path     = require('path'),
    Project  = require(path.resolve('models/Project')),
    Resource = require(path.resolve('models/Resource'));

module.exports = function (app) {

    app.get("/projects", function (req, res) {
        Project.find(function (err, doc) {
            if (err)
                return res.send(500);

            res.send(doc);
        });
    });

    app.post("/projects", function (req, res) {
        console.log(req.body);
        new Project(req.body).save(function (err, doc) {
            if (err)
                return res.send(500);

            return res.send(200, doc);
        });
    });
};