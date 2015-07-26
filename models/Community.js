var mongoose = require('mongoose');

var CommunitySchema = new mongoose.Schema({
    description:    String,
    taskWall:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskWall' }],
    userIds:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    usernames:      [String],
    posts:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

mongoose.model('Community', CommunitySchema);
