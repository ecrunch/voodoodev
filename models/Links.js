var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
        videoName: String,
        link: String,
	    source: String,
        author: String,
        upvotes: {type: Number, default: 0},
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

LinkSchema.methods.upvote = function(cb) {
        this.upvotes += 1;
        this.save(cb);
};

mongoose.model('Link', LinkSchema);
