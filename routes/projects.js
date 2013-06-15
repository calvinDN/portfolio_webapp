var path    = require('path'),
    Project = require(path.resolve('models/Project'));

module.exports = function(app) {

    app.get('/projects', function(req, res){
       Project.find(function(err, doc){
            if (err)
                return res.send(500);

            res.send(doc);
        });
    });

};