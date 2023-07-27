// Create Web server
// Run: node comments.js
// Test: http://localhost:3000/comments

// Import modules
var http = require('http');
var url = require('url');
var items = [];

// Create Web server
var server = http.createServer(function(req, res) {
  switch (req.method) {
    case 'POST':
      var item = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) {
        item += chunk;
      });
      req.on('end', function() {
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'GET':
      var body = items.map(function(item, i) {
        return i + ') ' + item;
      }).join('\n');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
  }
});

// Listen port 3000
server.listen(3000, function() {
  console.log('Listening on port 3000');
});
