var mongoose = require('mongoose');


var ProgressTrackerSchema = new mongoose.Schema({
	description: 	String,
	dueDate:	    Date,
	type:		    String,
	totalMinutes:	{type: Number, default:0},	
	userId:		    {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    taskWall:       {type: mongoose.Schema.Types.ObjectId, ref: 'TaskWall'}
});

ProgressTrackerSchema.methods.addTime = function(track) {
	this.totalMinutes = Number(this.totalMinutes) + Number(track);
};


mongoose.model('ProgressTracker', ProgressTrackerSchema);
