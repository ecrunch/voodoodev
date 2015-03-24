var assert 		= require("assert");
var taskFuncs 		= require('../models/Tasks.js');
var scheduleFuncs 	= require('../models/Schedules.js');



/*
	Task Tests
*/


describe('Initial task tests', function() {
	it('Should set up the base scores', function() {
		assert.equal(taskFuncs.getScore("Exam"), 5);
		assert.equal(taskFuncs.getScore("Project"), 4);
		assert.equal(taskFuncs.getScore("Paper"), 4);
		assert.equal(taskFuncs.getScore("Homework"), 3);
	});
});





/*
	Schedule Tests
*/

describe('Score data tests', function() {


});


function generateMockTasks() {
	return [
		{

		},
		{

		},
		{

		}
	];
}


describe('Task priority decider tests', function() {


});


describe('Timeslot generator tests', function() {

	var numHours = 4;
	var timeSlots, total;

	it('Should generate slots based on hours given', function() {
		timeSlots = scheduleFuncs.generateTimeSlots(numHours);
		total = 0;	
		for(var i = 0; i < timeSlots.length; i++) {
			total = total + timeSlots[i];
		}
		assert.equal(total % numHours, 0, 'Total time not divisible by ' + numHours + ' hours');
		assert.equal(total, numHours * 60, 'Total time not equal to ' + numHours * 60 + ' minutes');
	});


	it('Should generate slots w at least one break', function() {
		timeSlots = scheduleFuncs.generateTimeSlots(numHours);
		assert.notEqual(timeSlots.indexOf(15), -1, 'No 15: ' + timeSlots);
	});


});


function generateMockTimeSlots() {
	return [30, 60, 15, 60, 60, 15];
}


function generateMockPrioritizedTasks() {
	return {
		"eTasks": [
			{
				description: "Task A"
			},
			{
				description: "Task B"
			}
		],
		"nTasks": [
			{
				description: "Task C"
			},
			{
				description: "Task D"
			}
		],
		"ntTasks": [
			{
				description: "Task E"
			},
			{
				description: "Task F"
			}
		]
	};
}


function generateMockWants() {
	return [
		{
			description: "Fuck Bitches"
		},
		{
			description: "Get Money"
		},
		{
			description: "Live Life"
		}
	];
}

function generateMockBreaks() {
	return [
		{
			description: "reddit"
		},
		{
			description: "youtube"
		},
		{
			description: "theonion"
		}
	];
}


describe('Schedule maker tests', function() {


	var timeSlots = generateMockTimeSlots();
	var taskPriorities = generateMockPrioritizedTasks();
	var wants = generateMockWants();
	var breaks = generateMockBreaks();

	var schedule;
	it('Should have only breaks in the 15 min slots', function() {
		schedule = scheduleFuncs.makeSchedule(
			timeSlots, taskPriorities, wants, breaks, true
		);

		for(var i = 0; i < schedule.length; i++) {
			if(schedule[i].minutes == 15) {
				assert.notEqual(schedule[i].description, "task");
				assert.notEqual(schedule[i].description, "want");
			}
			else {
				assert.notEqual(schedule[i].description, "break");
			}
		}

	});
});



