

var mongoose = require('mongoose');


var ScheduleSchema = new mongoose.Schema({

	hours: Number,

	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],

	wants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Want'}],

	breaks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Break'}]


});


mongoose.model('Schedule', ScheduleSchema);







