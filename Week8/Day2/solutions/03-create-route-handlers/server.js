const http = require("http");

let nextDogId = 1;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // console.log('request object ', req)

  let reqBody = ""; // affiliate=nasa&query=Mars+Rover%21&commit=Search
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      req.body = reqBody // affiliate=nasa&query=Mars+Rover%21&commit=Search
        .split("&") // [affiliate=nasa,query=Mars+Rover%21,commit=Search]
        .map((keyValuePair) => keyValuePair.split("=")) //  [[affiliate,nasa],[query,Mars+Rover%21],[commit,Search]]
        .map(([key, value]) => [key, value.replace(/\+/g, " ")]) // [[affiliate,nasa],[query,Mars Rover%21],[commit,Search]]
        .map(([key, value]) => [key, decodeURIComponent(value)]) // [[affiliate,nasa],[query,Mars Rover!],[commit,Search]]
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      console.log(req.body);
    }
    // Do not edit above this line

    // define route handlers here
    if (req.method === "GET" && req.url === "/") {
      const responseBody = "Dog Club";

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url === "/dogs") {
      const responseBody = "Dog Index";

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url.startsWith("/dogs/")) {
      console.log("req url ", req.url);

      const urlParts = req.url.split("/");

      if (urlParts.length === 3) {
        console.log("url parts ", urlParts);
        const dogId = urlParts[urlParts.length - 1];

        let responseBody;
        if (dogId !== "new") {
          responseBody = `Dog details for dogId: ${dogId}`;
        } else {
          responseBody = `Dog create form page`;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        return res.end(responseBody);
      }
    }

    if (req.method === "POST" && req.url === "/dogs") {
      const dogId = getNewDogId();
      res.statusCode = 302;
      res.setHeader("Location", `/dogs/${dogId}`);
      return res.end();
    }
    // Do not edit below this line
    // Return a 404 response when there is no matching route handler
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    return res.end("No matching route handler found for this endpoint");
  });
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
