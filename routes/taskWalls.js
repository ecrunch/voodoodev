
module.exports = function(config) {

    var router  = config.router;
    var auth    = config.auth;

    var TaskWall= config.TaskWall;
    var User    = config.User;
    var Link    = config.Link;
    var Post    = config.Post;

    router.get('/taskWall', function(req, res, next) {
        TaskWall.find(function(err, taskWall){
            if(err){
                return next(err);
            }
             res.json(taskWall);
        });
    });

    router.param('taskWall', function(req, res, next, id) {
        var query = TaskWall.findById(id);
        query.exec(function (err, taskWall) {
             if (err) {
                 return next(err);
             }
             if (!taskWall) {
                 return next(new Error('can\'t find task'));
             }
             req.taskWall = taskWall;
             return next();
        });
    });

    router.get('/taskWall/:taskWall', function(req, res) {
        req.taskWall.populate('posts links', function(err, taskWall) {
            res.json(req.taskWall);

        });
    });
    
    router.post('/taskWall/:taskWall/posts', auth, function(req, res, next) {
        var post = new Post(req.body);
        post.taskWall = req.taskWall;
        post.author = req.payload.username;
        post.save(function(err, post){
            if(err){
                return next(err);
            }

            req.taskWall.posts.push(post);
            req.taskWall.save(function(err, taskWall) {
                if(err){
                    return next(err);
                }
                res.json(post);
            });
        });
    });

    router.post('/taskWall/:taskWall/links', auth, function(req, res, next) {
        var link = new Link(req.body);
        link.taskWall = req.taskWall;
        link.author = req.payload.username;
        link.save(function(err, link){
            if(err){
                return next(err);
            }
            req.taskWall.links.push(link);
            req.taskWall.save(function(err, taskWall) {
                 if(err){
                     return next(err);
                 }
                 res.json(link);
            });
        });
    });
                             



};
