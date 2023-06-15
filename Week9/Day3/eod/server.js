const http = require("http");
const fs = require("fs");

const comments = [];

const getContentType = (ext) => {
  switch (ext) {
    case "js":
      return "text/javascript";
    case "css":
      return "text/css";
    default:
      return "text/plain";
  }
};

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
      if (req.headers["content-type"] === "application/json") {
        req.body = JSON.parse(reqBody);
      } else {
        req.body = reqBody
          .split("&")
          .map((keyValuePair) => keyValuePair.split("="))
          .map(([key, value]) => [key, value.replace(/\+/g, " ")])
          .map(([key, value]) => [key, decodeURIComponent(value)])
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});
      }
      console.log(req.body);
    }

    if (req.method === "GET" && req.url.startsWith("/static/")) {
      const urlParts = req.url.split("/static/");
      console.log("url parts ", urlParts);
      const assetPath = urlParts[1];

      const responseBody = fs.readFileSync(`./${assetPath}`);

      const extension = assetPath.split(".")[1];
      console.log("extension ", extension);

      const contentType = getContentType(extension);
      console.log("content type ", contentType);

      res.setHeader("Content-Type", contentType);
      res.statusCode = 200;
      return res.end(responseBody);
    }

    /*
      [x] get comments when page loads
      [] post comments and return newly created comment
    */

    if (req.method === "GET" && req.url === "/") {
      const htmlPage = fs.readFileSync("index.html", "utf-8");

      res.setHeader("Content-Type", "text/html");
      res.statusCode = 200;
      return res.end(htmlPage);
    }

    if (req.method === "GET" && req.url === "/comments") {
      const responseBody = JSON.stringify(comments);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(responseBody);
    }

    if (req.method === "POST" && req.url === "/comments") {
      const { comment } = req.body;
      comments.push(comment);

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(comment));
    }
  });
});

const port = 5000;
server.listen(port, () => console.log(`server listening on port ${port}`));
