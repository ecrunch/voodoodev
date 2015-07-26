var mongoose = require('mongoose');

var TaskWallSchema = new mongoose.Schema({
    description:    String,
    dueDate:        Date,
    type:           String,
    group:          String,
    community:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community'}],
    userIds:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groupTime:      {type: Number, default:0},
    tasks:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    comments:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    posts:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    links:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link'}]
});

mongoose.model('TaskWall', TaskWallSchema);

