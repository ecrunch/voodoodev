

var mongoose = require('mongoose');

var Scheduler = require('./src/Scheduler.js');

var Task = require('./src/Task.js');

var ScheduleSchema = new mongoose.Schema({

	hours: Number,

	items: [{number: Number, minutes: Number, details: {description: String}, type: String}],

	userId: Number

});

ScheduleSchema.methods.createNew = function(hours, tasks, breathers) {

	var ourTasks = [];
	var init;
	for(var i = 0; i < tasks.length; i++) {
		
		init = {
			description:	tasks[i].description,
			userId:		tasks[i].userId,
			userName:	tasks[i].userName,
			dueDate:	tasks[i].dueDate,
			type:		tasks[i].type,
			totalMinutes:	tasks[i].totalMinutes
		};
		ourTasks.push(new Task(init));
	}

	var scheduler  	= new Scheduler({'hours':hours, 'tasks':ourTasks, 'breathers':breathers});
	var schedule 	= scheduler.makeNewSchedule();

	for( var i = 0; i < schedule.length; i++) {	
		this.items.push(schedule[i]);
	}
	return schedule;

};


mongoose.model('Schedule', ScheduleSchema);
