const http = require("http");

const dogs = [
  {
    dogId: 1,
    name: "Fluffy",
    age: 2,
  },
];

let nextDogId = 2;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    // request is finished assembly the entire request body
    // Parsing the body of the request depending on the Content-Type header
    if (reqBody) {
      switch (req.headers["content-type"]) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ======================== ROUTE HANDLERS ======================== */

    // GET /dogs
    if (req.method === "GET" && req.url === "/dogs") {
      // Your code here
      const responseBody = JSON.stringify(dogs);
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;

      return res.end(responseBody);
    }

    // GET /dogs/:dogId
    if (req.method === "GET" && req.url.startsWith("/dogs/")) {
      const urlParts = req.url.split("/"); // ['', 'dogs', '1']
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here

        const foundDog = dogs.find((dog) => dog.dogId === +dogId);

        if (foundDog) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(foundDog));
        }
      }
    }

    // POST /dogs
    if (req.method === "POST" && req.url === "/dogs") {
      const { name, age } = req.body;
      // Your code here
      const dog = {
        name,
        age,
        dogId: getNewDogId(),
      };

      dogs.push(dog);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");

      return res.end(JSON.stringify(dog));
    }

    // PUT or PATCH /dogs/:dogId
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.url.startsWith("/dogs/")
    ) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here

        const { name, age } = req.body;
        const foundDog = dogs.find((dog) => dog.dogId == dogId);

        if (foundDog) {
          // if (name) foundDog.name = name;
          // if (age) foundDog.age = age;

          foundDog.name = name || foundDog.name;
          foundDog.age = age || foundDog.age;

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(foundDog));
        }
      }
      return res.end();
    }

    // DELETE /dogs/:dogId
    if (req.method === "DELETE" && req.url.startsWith("/dogs/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        //find the index of the dog based on the dogId
        //splice or remove that dog object from the array based on the found index

        let dog = dogs.find((dog) => dog.dogId == dogId);
        console.log('dog ', dog)

        let dogIndex = dogs.indexOf(dog);
        // let dogIndex = dogs.findIndex(dog => dog.dogId == dogId);
        console.log('dog index ', dogIndex)

        dogs.splice(dogIndex, 1);

        let body = {
          message: 'Successfully deleted'
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(body))
      }
  
    }

    // No matching endpoint
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end("Endpoint not found");
  });
});

if (require.main === module) {
  const port = 8000;
  server.listen(port, () => console.log("Server is listening on port", port));
} else {
  module.exports = server;
}
