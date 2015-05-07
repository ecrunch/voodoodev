var mongoose = require('mongoose');

var AssignmentSchema = new mongoose.Schema({
	name: String,
	dueDate: Date,
	author: String,
	type: String,
	course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
	users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	joinedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});



AssignmentSchema.methods.test = function() {
	console.log("Shit is connected");
};


mongoose.model('Assignment', AssignmentSchema);

