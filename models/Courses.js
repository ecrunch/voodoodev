var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
	title: String,
	link: String,
	upvotes: {type: Number, default: 0},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
	users:[],	
	usernames:[],
	assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

CourseSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('Course', CourseSchema);
