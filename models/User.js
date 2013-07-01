var path     = require('path'),
    mongoose = require('mongoose');

schema = new mongoose.Schema({
    email :      { type: String, unique: true },
    name  : {
        first  : { type: String },
        last   : { type: String }
    },
    facebookId : { type: String, unique: true, sparse : true }
});

var User = module.exports = mongoose.model('User', schema);