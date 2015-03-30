var mongoose = require('mongoose');

var BreatherSchema = new mongoose.Schema({
	title: String,
	link: String,
	upvotes: {type: Number, default: 0},
});


BreatherSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('Breather', BreatherSchema);

