
var assert 		= require("assert");
var Task 		= require('../models/src/Task.js');
var Scheduler 		= require('../models/src/Scheduler.js');
var Mock 		= require('../models/src/Mocks.js');


/*
	Task Tests
*/



describe('Task tests', function() {
	
	var exam, project, paper, homework, other;
	beforeEach(function(done) {
		exam 		= new Task({type:'Exam'});
		project 	= new Task({type:'Project'});
		paper 		= new Task({type:'Paper'});
		homework 	= new Task({type:'Homework'});
		done();
	});

	it('Should get the days remaining until the due date', function() {
	
		// TODO write some tests
	});


});


// 

/*
	Schedule Tests
*/



describe('Scheduler tests', function() {


	var scheduler;

	beforeEach(function(done) {
		scheduler = new Scheduler(4, [], []);
		done();
	});

	describe('Timeslot generator tests', function() {


		var numHours = 4;
		var timeSlots, total;
	
		beforeEach(function(done) {
			done();
		});

		it('Should generate slots based on hours given', function() {
			timeSlots = scheduler.generateTimeSlots(numHours);
			total = 0;	
			for(var i = 0; i < timeSlots.length; i++) {
				total = total + timeSlots[i];
			}
			assert.equal(total % numHours, 0, 
				'Total time not divisible by ' + numHours + ' hours');
			assert.equal(total, numHours * 60, 
				'Total time not equal to ' + numHours * 60 + ' minutes');
		});


		it('Should generate slots w at least one break', function() {
			timeSlots = scheduler.generateTimeSlots(numHours);
			assert.notEqual(timeSlots.indexOf(15), -1, 'No 15: ' + timeSlots);
		});

	});

	describe('Schedule maker tests', function() {

		var timeSlots = Mock.generateMockTimeSlots();
		var taskPriorities = Mock.generateMockPrioritizedTasks();
		var wants = Mock.generateMockWants();
		var breaks = Mock.generateMockBreaks();
		var newSchedule;
	
		beforeEach(function(done) {
			done();
		});


		it('Should have only breaks in the 15 min slots', function() {
			newSchedule = scheduler.makeSchedule(
				timeSlots, taskPriorities, wants, breaks, true
			);

			for(var i = 0; i < newSchedule.length; i++) {
				if(newSchedule[i].minutes == 15) {
					assert.notEqual(newSchedule[i].description, "task");
					assert.notEqual(newSchedule[i].description, "want");
				}
				else {
					assert.notEqual(newSchedule[i].description, "break");
				}
			}

		});

	});


}); //end of scheduler tests






