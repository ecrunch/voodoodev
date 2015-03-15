var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},  
  subTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubTask' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

TaskSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Task', TaskSchema);
