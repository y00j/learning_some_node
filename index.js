const fs = require('fs');
const http = require('http');
const port = 3004;

const requestHandler = (request, response) => {
  console.log(request.url);
  if (request.url.endsWith("/colors")) {
    var rstream = fs.createReadStream('colors.json');
    rstream.pipe(response);
  } else if (request.url.endsWith("/http-client")) {
    http.get('http://localhost:3004/colors', callback).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  } else {
    response.end('Default route: Hello Node.js Server!');
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});


function callback(resp) {
  let data = '';
    
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });
}