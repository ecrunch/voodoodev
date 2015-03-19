

var mongoose = require('mongoose');


var ScheduleSchema = new mongoose.Schema({

	hours: Number,

	items: [{description: String, score: Number}],

	userId: Number

});

// maybe modulize this eventually
function getScoreData(tasks) {

	var scoreData = {
		"totalScores":	0,
		"scoreList":	[],
		"mean":		0,
		"stdDev": 	0,
		"variance":	0
	};
	
	var score;
	for(var i = 0; i < tasks.length; i++) {	
		score = tasks[i].getScore();
		scoreData["total"] += score;
		scoreData["list"].push(score);
	}
	return scoreData;
}


function determineTaskPriorities(tasks, scoreData) {

	var taskPriorities = {
		"eTasks": 	[],
		"nTasks": 	[],
		"ntTasks": 	[]
	};

	var score;
	for(var i = 0; i < tasks.length; i++) {
		score = tasks[i].getScore();
	}

	return taskPriorities;
}


ScheduleSchema.methods.createNew = function(hours, tasks, wants, breaks) {
	console.log("Creating Schedule");
	
	
	var scoreData = getScoreData(tasks);

	//score the tasks
	var e_tasks, n_tasks, nt_tasks, all;
	all 	= determineTaskPriorities(task, scoreData);
	eTasks 	= all["eTasks"];
	nTasks 	= all["nTasks"];
	ntTasks = all["ntTasks"];
	

	for(var i = 0; i < tasks.length; i++) {
		this.items.push(
			{
				description: 	tasks[i].description,
				score:		tasks[i].getScore()
			}	
		);
	}

};


mongoose.model('Schedule', ScheduleSchema);
