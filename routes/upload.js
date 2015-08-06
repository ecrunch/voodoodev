module.exports = function(config) {

    var router = config.router;
    var auth = config.auth;

    router.post('/upload_file', function(req, res, next) {
        console.log(req.route);
        res.json("We cool");
    });

};
