

var mongoose = require('mongoose');

var Scheduler = require('./src/Scheduler.js');

var Task = require('./src/Task.js');

var Breather = require('./src/Breather.js');

var ScheduleSchema = new mongoose.Schema({

	hours: Number,

	items: [{number: Number, minutes: Number, details: {description: String}, type: String}],

	userId: Number

});

ScheduleSchema.methods.createNew = function(hours, tasks, breathers) {

	var ourTasks = [];
	var ourBreathers = [];
	var init;
	for(var i = 0; i < tasks.length; i++) {
		
		init = {
			id:		tasks[i]._id,
			description:	tasks[i].description,
			userId:		tasks[i].userId,
			userName:	tasks[i].userName,
			dueDate:	tasks[i].dueDate,
			type:		tasks[i].type,
			totalMinutes:	tasks[i].totalMinutes
			
		};
		ourTasks.push(new Task(init));
	}

	for(var i = 0; i < breathers.length; i++) {
		init = {
			id: breathers[i]._id,
			description: breathers[i].title,
		};
		ourBreathers.push(new Breather(init));
	}


	var scheduler  	= new Scheduler({'hours':hours, 'tasks':ourTasks, 'breathers':ourBreathers});
	var schedule 	= scheduler.makeNewSchedule();

	for( var i = 0; i < schedule.length; i++) {	
		this.items.push(schedule[i]);
	}
	return schedule;

};


mongoose.model('Schedule', ScheduleSchema);
