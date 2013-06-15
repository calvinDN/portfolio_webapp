var path     = require('path'),
    mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name        : { type: String },
    description : { type: String },
    link        : { type: String }
});

var Resource = module.exports = mongoose.model('Resource', schema);