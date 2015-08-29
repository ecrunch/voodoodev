var mongoose = require('mongoose');

var ContentSchema = new mongoose.Schema({
    name:           String,
    data:           String,
    contentType:    String,
    source:         String,
    });

mongoose.model('Content', ContentSchema);


