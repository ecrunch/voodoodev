

/*
**	Scheduler object
*/



function Scheduler(init) {
	this.hours 	= init.hours || 4;
	this.tasks 	= init.tasks || [];
	this.breathers 	= init.breathers || [];
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMean(scoreData){
	return scoreData["total"]/scoreData["list"].length;
}


function getVariance(scoreData) {
	
	var len = scoreData["list"].length;
	if (len <= 1) {
		return 0;
	}
	var sum = scoreData["total"];
	var mean = scoreData["mean"];	
	var v = 0;
	var score;
	for (var i = 0; i < len; i++) {
		score = scoreData["list"][i];
		v = v + (score - mean) * (score - mean);	
	}
	return v/len;

}

function getStd(scoreData) {
	var variance = scoreData["variance"];
	var std = Math.sqrt(variance);

	return std;
}

Scheduler.prototype.getScoreData = function(tasks) {

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
	scoreData["mean"] 	= getMean(scoreData);
	scoreData["variance"] 	= getVariance(scoreData);
	scoreData["stdDev"] 	= getStd(scoreData);
	return scoreData;

};

Scheduler.prototype.determineTaskPriorities = function(tasks, scoreData) {

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
		//taskScore	= getRandomInt(1, 10);
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
};


Scheduler.prototype.generateTimeSlots = function(hours) {

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

};


Scheduler.prototype.makeSchedule = function(timeSlots, scoredTasks, breathers, repeatItems) {

	console.log(breathers);

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

			numberOfItems 	= breathers.length;
			addIndex 	= getRandomInt(0, numberOfItems -1);
			itemToAdd 	= breathers[addIndex];
			schedule.push(
				{
					"number": 	number,
					"minutes": 	minutesToAdd,
					"details":	{"description": itemToAdd["description"]},
					"type":		"breather"
				}
			);			
		}
		else{
			if (eIndex < scoredTasks["eTasks"].length) {
				chosenList = scoredTasks["eTasks"];
				chosenIndex = eIndex;
				eIndex += 1;
			}
			else if(nIndex < scoredTasks["nTasks"].length) {
				chosenList = scoredTasks["nTasks"];
				chosenIndex = nIndex;
				nIndex += 1;	
			}
			else if(ntIndex < scoredTasks["ntTasks"].length) {
				chosenList = scoredTasks["ntTasks"];
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
				// die
				return [];
			}
			itemToAdd = chosenList[chosenIndex];

			schedule.push(
				{
					"number":	number,
					"minutes":	minutesToAdd,
					"details":	{
						"description":	itemToAdd["description"],
						"id":		itemToAdd["id"]
					},
					"type":		"task"
				}
			);

		}  //end of task block

		number += 1;

	} //end of time slot for loop	
	return schedule;
};


Scheduler.prototype.makeNewSchedule = function() {

	var repeatItems 	= true;
	var scoreData 		= this.getScoreData(this.tasks);
	var scoredTasks 	= this.determineTaskPriorities(this.tasks, scoreData);
	var timeSlots 		= this.generateTimeSlots(this.hours);

	var schedule = this.makeSchedule(timeSlots, scoredTasks, this.breathers, repeatItems);

	return schedule;

}



module.exports = Scheduler;

