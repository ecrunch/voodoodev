


var assert = require("assert");
var scheduleFuncs = require("../models/Schedules.js");



describe('TimeSlot Generator', function() {

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

