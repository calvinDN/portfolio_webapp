var path     = require('path'),
    mongoose = require('mongoose'),
    Resource = require(path.resolve('models/Resource'));

var schema = new mongoose.Schema({
    name        : { type: String },
    last_commit : { type: Date },
    completed   : { type: Boolean },
    images      : [ String ],
    description : { type: String },
    github      : { type: String },
    resources   : [ Resource ]  // sub document
});

var Project = module.exports = mongoose.model('Project', schema);