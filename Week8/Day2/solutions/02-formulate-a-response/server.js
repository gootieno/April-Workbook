// Your code here

// require the http package
const http = require("http");
// create a server
const server = http.createServer((req, res) => {
  //get response body
  const responseBody = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello there!</h1>
  </body>
  </html>
`;
  //set status code
  res.statusCode = 200;
  //set header
  res.setHeader("Content-Type", "text/html");
  //return response body
  return res.end(responseBody);
  

//   if(req.method === 'GET' && req.url === '/cats'){
//     // server code stuff
//     const responseBody = 'Dog Club'

//     return res.end('Dog Club');
//   }

//   if(req.method === 'GET' && req.url === '/dogs'){
//     // server code stuff

//     return res.end(responseBody);
//   }

  

});

// create a port
const port = 5000;
// listen on the port
server.listen(port, () => console.log(`listening on port ${port}`));
