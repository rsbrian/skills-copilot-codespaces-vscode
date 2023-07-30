// Create Web browser

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    if (pathname == "/") {
        pathname = "index.html";
    }
    if (pathname == "/index.html") {
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, {'Content-Type': 'text/html'});
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data.toString());
            }
            response.end();
        });
    } else if (pathname == "/comments") {
        var postData = "";
        request.addListener("data", function (data) {
            postData += data;
        });
        request.addListener("end", function () {
            var obj = qs.parse(postData);
            console.log(obj);
            fs.readFile(pathname.substr(1), function (err, data) {
                if (err) {
                    console.log(err);
                    response.writeHead(404, {'Content-Type': 'text/html'});
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.write(data.toString());
                }
                response.end();
            });
        });
    } else {
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, {'Content-Type': 'text/html'});
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data.toString());
            }
            response.end();
        });
    }
}).listen(8080);

console.log('Server running at http://