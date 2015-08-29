var mongoose = require('mongoose');

var BreatherSchema = new mongoose.Schema({
	title:      String,
	link:       String,
	links:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
	content:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    upvotes:    {type: Number, default: 0},
	comments:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	userId:     {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


BreatherSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('Breather', BreatherSchema);

