// Create web server
// Run: node comments.js
// Test: curl http://localhost:8000/comments

var http = require('http');
var url = require('url');

// Create a web server
var server = http.createServer(function(request, response) {
  // Get the URL and parse it
  var parsedUrl = url.parse(request.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the HTTP method
  var method = request.method.toLowerCase();

  // Send the response
  response.end('Hello World\n');

  // Log the request path
  console.log(`Request received on path: ${trimmedPath} with method: ${method}`);
});

// Start the server and listen on port 8000
server.listen(8000, function() {
  console.log('The server is listening on port 8000 now');
});