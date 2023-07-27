// Create Web server
var express = require('express');
var router = express.Router();

// Create a new Comment
router.post('/', function(req, res) {
    console.log('POST /comments');
    console.log(req.body);

    var comment = new Comment({
        name: req.body.name,
        text: req.body.text
    });

    comment.save(function(err, comment) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(comment);
    });
});

// GET all comments
router.get('/', function(req, res) {
    console.log('GET /comments');

    Comment.find(function(err, comments) {
        if (err) res.send(500, err.message);

        console.log('GET /comments');
        res.status(200).jsonp(comments);
    });
});

module.exports = router;