

var mongoose = require('mongoose');


var ScheduleSchema = new mongoose.Schema({

	hours: Number,

	items: [{number: Number, minutes: Number, details: {description: String}}],

	userId: Number,

	type: String

});


//implement or get from somewhere 
function getMean(){
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


		// we do not get a break next round 
		if(comingOffBreak) {
			toAdd = getRandomInt(2,4);
			timeWithoutBreak = 0;
		}

		// we must get a break next round
		else if(timeWithoutBreak >= 90) {
			toAdd = 1;
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
		timeWithoutBreak += minuteSection;
	
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


function makeSchedule(timeSlots, taskPriorities, wants, breaks, repeatItems) {

	var eIndex 	= 0;
	var nIndex 	= 0;
	var ntIndex 	= 0;

	var schedule 	= [];

	var chosenList, chosenIndex;

	var minutesToAdd, numberOfItems, addIndex, itemToAdd, randomInt;
	var number = 1;

	for(var i = 0; i < timeSlots.length; i++) {
		
		minutesToAdd = timeSlots[i];

		// break
		if (minutesToAdd == 15) { 

			numberOfItems 	= breaks.length;
			addIndex 	= getRandomInt(0, numberOfItems -1);
			itemToAdd 	= breaks[addIndex];
			schedule.push(
				{
					"number": 	number,
					"minutes": 	minutesToAdd,
					"details":	{"description": itemToAdd["description"]},
					"type":		"break"
				}
			);			
		}
		// task or want
		else {
			randomInt = getRandomInt(1, 2);

			// wants
			if (randomInt == 1) {
			
				numberOfItems 	= wants.length;
				addIndex 	= getRandomInt(0, numberOfItems -1);
				itemToAdd 	= wants[addIndex];
				schedule.push(
					{
						"number":	number,
						"minutes":	minutesToAdd,
						"details":	{
							"description": itemToAdd["description"]
						},
						"type":		"want"
					}
				);
			}

			// tasks
			else {
				if (eIndex < taskPriorities["eTasks"].length) {
					chosenList = taskPriorities["eTasks"];
					chosenIndex = eIndex;
					eIndex += 1;
				}
				else if(nIndex < taskPriorities["nTasks"].length) {
					chosenList = taskPriorities["nTasks"];
					chosenIndex = nIndex;
					nIndex += 1;	
				}
				else if(ntIndex < taskPriorities["ntTasks"].length) {
					chosenList = taskPriorities["ntTasks"];
					chosenIndex = ntIndex;
					ntIndex += 1;
				}
				else if(repeatItems) {
					eIndex 	= 0;
					nIndex 	= 0;
					ntIndex = 0;
					chosenIndex = 0;
				}
				else {
					// do nothing
				}
				itemToAdd = chosenList[chosenIndex];

				schedule.push(
					{
						"number":	number,
						"minutes":	minutesToAdd,
						"details":	{
							"description":	itemToAdd["description"]
						},
						"type":		"task"
					}
				);

			}

		}  //end of task or want block

		number += 1;

	} //end of time slot for loop	


	return schedule;
}


//export the functions for testing
module.exports = function() {
	return {
		getMean:			getMean,
		getStd:				getStd,
		getScoreData: 			getScoreData,
		determineTaskPriorities:	determineTaskPriorities,
		getRandomInt:			getRandomInt,
		generateTimeSlots:		generateTimeSlots,
		makeSchedule:			makeSchedule 
	};
}();

ScheduleSchema.methods.createNew = function(hours, tasks, wants, breaks) {

	var repeatItems = true;
	
	var scoreData 		= getScoreData(tasks);
	var taskPriorities 	= determineTaskPriorities(tasks, scoreData);
	var timeSlots 		= generateTimeSlots(hours);

	var schedule = makeSchedule(timeSlots, taskPriorities, wants, breaks, repeatItems);
	this.items = schedule;

};


mongoose.model('Schedule', ScheduleSchema);
