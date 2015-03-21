

var mongoose = require('mongoose');


var ScheduleSchema = new mongoose.Schema({

	hours: Number,

	items: [{description: String, score: Number}],

	userId: Number

});




//implement or get from somewhere 
function getMean() {
	return 0;
}

function getStd() {
	return 0;
}


// maybe modulize this eventually
function getScoreData(tasks) {

	var scoreData = {
		"total":	0,
		"list":		[],
		"mean":		0,
		"stdDev": 	1,
		"variance":	1
	};
	
	var score;
	for(var i = 0; i < tasks.length; i++) {	
		score = tasks[i].getScore();
		scoreData["total"] += score;
		scoreData["list"].push(score);
	}

	//fill in the last 3 stats
	scoreData["mean"] 	= scoreData["total"]/scoreData["list"].length;
	//scoreData["variance"] 	= getVariance(scoreData["list"]); 
	//scoreData["stdDev"] 	= Math.sqrt(scoreData["variance"]);

	return scoreData;
}

function determineTaskPriorities(tasks, scoreData) {

	var taskPriorities = {
		"eTasks": 	[],
		"nTasks": 	[],
		"ntTasks": 	[]
	};

	var taskScore, zScore;
	var mean 	= scoreData["mean"];
	var stdDev 	= scoreData["stdDev"];
	
	for(var i = 0; i < tasks.length; i++) {
		
		taskScore	= tasks[i].getScore();
		zScore		= (taskScore - mean)/stdDev;

		if (zScore >= 0.8416) {
			taskPriorities["eTasks"].push(tasks[i]);
		}

		else if(zScore >= -0.2533) {
			taskPriorities["nTasks"].push(tasks[i]);
		}

		else {
			taskPriorities["ntTasks"].push(tasks[i]);	
		}
		 
	}

	return taskPriorities;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateTimeSlots(hours) {

	var timeInMinutes 	= hours*60;
	var total 		= 0;
	var timeSlots		= [];
	var comingOffBreak 	= false;
	var timeWithoutBreak 	= 0;

	var timeConversions = {
		1: 15,
		2: 30,
		3: 45,
		4: 60
	};

	var toAdd, minuteSection;
	while (total <= timeInMinutes) {
	
		if(total == timeInMinutes) {
			break;
		}


		if(comingOffBreak) {
			//random int
			toAdd = getRandomInt(2,4)
		}


		else if(timeWithoutBreak >= 90) {
			toAdd 			= 1;
			timeWithoutBreak 	= 0;
		}

		else {
			toAdd = getRandomInt(1,4)
		}

		minuteSection = timeConversions[toAdd];

		if(minuteSection == 15) {
			comingOffBreak = true;
		}
		else{
			comingOffBreak = false;
		}
	
		timeSlots.push(minuteSection);

		total += minuteSection;
	
	}

	// we went over a bit
	if (total > timeInMinutes) {


		var lastIndex = timeSlots.length - 1;

		// the time that took us over the mark
		var lastTime = timeSlots[lastIndex]; 
		
		//bring total back to before lastTime was added
		total = total - lastTime;

		//see how much is left to go
		var leftToGo = timeInMinutes - total;

		//add leftToGo as the last slot
		if (leftToGo != 0) {
			timeSlots[lastIndex] = leftToGo;
		}
		//remove the last number entirely
		else{
			timeSlots.pop();
		}

	}


	return timeSlots;


}


ScheduleSchema.methods.createNew = function(hours, tasks, wants, breaks) {
	
	var scoreData = getScoreData(tasks);
	var taskPriorities = determineTaskPriorities(tasks, scoreData);

	
	var eIndex 	= 0;
	var nIndex 	= 0;
	var ntIndex 	= 0;

	var timeSlots = generateTimeSlots(hours);
	var schedule = [];


	var chosenList = taskPriorities["eTasks"];
	var chosenIndex = eIndex;

	var minutesToAdd;
	for(var i = 0; i < timeSlots.length; i++) {
		

		if (minutesToAdd == 15) { 
			
		}


	}



	
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
