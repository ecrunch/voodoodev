var mongoose = require('mongoose');


var TaskSchema = new mongoose.Schema({
	description: 	String,
	dueDate:	Date,
	type:		String,
	totalMinutes:	Number,	
	comments: 	[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	upvotes: 	{type: Number, default: 0},
	userId:		{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	userName:	String
});


TaskSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('Task', TaskSchema);
