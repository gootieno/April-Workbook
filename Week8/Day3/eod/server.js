const http = require("http");
const fs = require("fs");

const comments = [];

const server = http.createServer((req, res) => {
  /*
    TODO
    [x] post route for creating comments
    [x] parsing function for data being sent for posts
    [x] use templating in home route for rendering comments
    [x] route for serving static assets

    libraries
    [x] fs library 
    
    data structures / helper functions
    [x] comments array 
  
  
  */

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      console.log(req.body);
    }

    if (req.method === "GET" && req.url.startsWith("/static/")) {
      const urlParts = req.url.split("/static/");
      console.log("url parts ", urlParts);
      const assetPath = urlParts[1];

      const responseBody = fs.readFileSync(`./${assetPath}`);

      res.setHeader("Content-Type", "text/css");
      res.statusCode = 200;
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url === "/") {
      const htmlPage = fs.readFileSync("index.html", "utf-8");

      let commentsList = "";

      for (const comment of comments) {
        commentsList += `<li>${comment}</li>`;
      }

      const responseBody = htmlPage.replace(
        /#{comments}/,
        comments.length ? commentsList : `<li>No Comments Created</li>`
      );
      res.setHeader("Content-Type", "text/html");
      res.statusCode = 200;
      return res.end(responseBody);
    }

    if (req.method === "POST" && req.url === "/comments") {
      const { comment } = req.body;
      comments.push(comment)

      res.statusCode = 302;
      res.setHeader('Location', '/')
      return res.end()
    }
  });
});

const port = 5000;
server.listen(port, () => console.log(`server listening on port ${port}`));
