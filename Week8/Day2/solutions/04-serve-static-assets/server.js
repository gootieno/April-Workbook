const http = require("http");
const fs = require("fs");

const getContentType = (ext) => {
  if (ext === "jpg") return "image/jpeg";
  else if (ext === "css") return "text/css";
  else return "text/plain";
};

const server = http.createServer((req, res) => {
  // Your code here

  if (req.method === "GET" && req.url === "/") {
    const responseBody = fs.readFileSync("index.html", "utf-8");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(responseBody);
  }

  // static assets
  // if (req.method === "GET" && req.url === "/static/css/application.css") {
  //   const responseBody = fs.readFileSync(
  //     "./assets/css/application.css",
  //     "utf-8"
  //   );

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/css");
  //   return res.end(responseBody);
  // }

  // if (req.method === "GET" && req.url === "/static/images/dog.jpg") {
  //   const responseBody = fs.readFileSync("./assets/images/dog.jpg");

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "image/jpeg");
  //   return res.end(responseBody);
  // }

  if (req.method === "GET" && req.url.startsWith("/static/")) {
    const urlSplit = req.url.split("/static/");
    console.log("split url ", urlSplit);

    const assetPath = urlSplit[1];
    console.log("asset path ", assetPath);

    const extension = assetPath.split(".")[1];
    console.log("extension ", extension);

    const responseBody = fs.readFileSync(`./assets/${assetPath}`);

    const contentType = getContentType(extension);

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    return res.end(responseBody);
  }
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
