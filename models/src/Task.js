

// copy/pasted from the original python :)
var BASE_SCORES = {
    "Exam" : 5,
    "Project" : 4,
    "Paper" : 4,
    "Homework" : 3,
	"Other" : 3		// <--- do not change. it is our legacy
};


var BASE_DAYS_TILL = {
    "Exam" : 10,
    "Project" : 15,
    "Paper" : 15,
    "Homework" : 5,
	"Other" : 3
};


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function Task(init){

	this.id			= init.id;
	this.description	= init.description;
	this.userId		= init.userId;
	this.userName		= init.userName;

	init.currentDate ?
		this.currentDate = new Date(init.currentDate) : this.currentDate = new Date();

	init.dueDate ?
		this.dueDate = new Date(init.dueDate) : this.dueDate = new Date();

	this.type 		= init.type || "Other";
	this.totalMinutes 	= init.totalMinutes || 0;
}


Task.prototype.getDaysRemaining = function() {	

	var MS_PER_DAY = 1000*60*60*24;

	if (this.dueDate < this.currentDate) {
		console.log("Overdue");
		this.dueDate = new Date();
	}

	var daysRemaining = (this.dueDate - this.currentDate)/MS_PER_DAY;

	return Math.floor(daysRemaining);

};


Task.prototype.getScore = function() {

	var daysRemaining = this.getDaysRemaining();
	
	if (daysRemaining <= 18) {
		return BASE_SCORES[this.type] + (
			BASE_DAYS_TILL[this.type] - daysRemaining
		) - this.totalMinutes/60;
	}

	return BASE_SCORES[this.type];
};


module.exports = Task;



