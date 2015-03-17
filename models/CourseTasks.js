var mongoose = require('mongoose');

var CourseTasksSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  author: String,
  upvotes: {type: Number, default: 0},
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

CourseTasksSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('CourseTask', CourseTasksSchema);
