var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  var filepath = '.' + req.url;
  if (filepath === './') {
    filepath = './index.html';
  }

  readFile(filepath, res);
}).listen(80);

function readFile (path, res) {
  fs.readFile(path, 'utf-8', function (err, data) {
    if (err) { 
      readFile('./index.html', res); 
    } else {
      res.write(data);
      res.end();    
    }
  });
}

console.log('Server running at http://127.0.0.1:80/');