var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	title: String,
	link: String,
	upvotes: {type: Number, default: 0},  
	subTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubTask' }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});


var baseScores = {
	"Exam": 5,
	"Project": 4,
	"Paper": 4,
	"Homework": 3
}

function getScore(base) {
	return baseScores[base];
}


module.exports = function() {
	return {
		getScore: getScore
	};
}();


TaskSchema.methods.getScore = function() {
	return getScore();
};

TaskSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('Task', TaskSchema);
