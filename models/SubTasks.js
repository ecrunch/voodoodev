var mongoose = require('mongoose');

var SubTasksSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  author: String,
  upvotes: {type: Number, default: 0},
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'task' }
});

SubTasksSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('SubTask', SubTasksSchema);
