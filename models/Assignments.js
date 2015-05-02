var mongoose = require('mongoose');

var AssignmentSchema = new mongoose.Schema({
	title: String,
	tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
});



Assignment.methods.test = function() {
	console.log("Shit is connected");
};


mongoose.model('Assignment', AssignmentSchema);

