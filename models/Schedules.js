

var mongoose = require('mongoose');

var Scheduler = require('./src/Scheduler.js');

var ScheduleSchema = new mongoose.Schema({

	hours: Number,

	items: [{number: Number, minutes: Number, details: {description: String}, type: String}],

	userId: Number

});

ScheduleSchema.methods.createNew = function(hours, tasks, breathers) {

	var scheduler  	= new Scheduler(hours, tasks, breathers);
	var schedule 	= scheduler.makeNewSchedule();

	for( var i = 0; i < schedule.length; i++) {	
		this.items.push(schedule[i]);
	}
	return schedule;

};


mongoose.model('Schedule', ScheduleSchema);
