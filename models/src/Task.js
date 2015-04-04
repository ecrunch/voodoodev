

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
	this.dueDate 		= init.dueDate || Date();	
	this.type 		= init.type || "Other";
	this.totalMinutes 	= init.totalMinutes || 0;
}


Task.prototype.getCurrentDate = function() {
	return Date();
};



Task.prototype.getDaysRemaining = function() {
	// TODO
	return getRandomInt(1,30);
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



