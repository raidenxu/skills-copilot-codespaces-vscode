// Create Web server
const express = require('express');
const app = express();
// Create Web socket server
const server = require('http').Server(app);
const io = require('socket.io')(server);
// Create a connection to the database
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/comments');

// Create a schema for the comments
const Comment = require('./model/comments');

// Create a route for the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Create a route for getting comments
app.get('/comments', (req, res) => {
  // Get all comments in the Comment model
  Comment.find({}, (err, comments) => {
    // Send the comments to the client
    res.send(comments);
  });
});

// Create a route for posting comments
app.post('/comments', (req, res) => {
  // Get the comment from the request body
  const comment = req.body;
  // Create a new comment model instance
  const commentModel = new Comment(comment);
  // Save it to database
  commentModel.save((err, savedComment) => {
    // Send the comment to the client
    res.send(savedComment);
  });
});

// Make the server listen on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
