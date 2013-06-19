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

    /*app.post("/projects", function (req, res) {
        new Project(req.body).save(function (err, doc) {
            if (err)
                return res.send(500);

            res.send(200, doc);
        });
    });*/

    app.post("/projects", function (req, res) {
        var child = new Resource({"name": "mona", "link": "poopy11111111"});
        var parent = new Project({ "name": "new test111111111" });
        /*parent.save(function (err, doc) {
            if (err) {
                console.log(err);
                return res.send(500);
            }
            res.send(200, doc);
        });*/

        parent.resources.push(child);
        console.log(parent);

        parent.save(function (err, doc) {
            if (err)
                return res.send(500);

            res.send(200, doc);
        });
    });

    app.post("/projects/:id/resources", function (req, res) {
        console.log(req.params.id);
        var resource = new Resource(req.body);
        Project.findById(req.params.id, function (err, project) {
            if (err)
                return res.send(500);
            if (project === null)
                return res.send(404);

            resource.save();
            console.log("message");
            console.log(project);
            //project.resources.push(resource);
            console.log("message1");
            project.save(function (err, doc) {
                if (err){
                    console.log(err);
                    return res.send(500);
            }
                res.send(200);
            });
        });
        res.send(500);
    });

};