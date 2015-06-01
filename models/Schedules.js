

var mongoose = require('mongoose');
var ScheduleSchema = new mongoose.Schema({

	hours: Number,

	items: [{number: Number, minutes: Number, details: {description: String}, type: String}],

	userId: Number

});

/*
*	TODO:  are we still planning on saving a schedule or not??
*/



mongoose.model('Schedule', ScheduleSchema);
