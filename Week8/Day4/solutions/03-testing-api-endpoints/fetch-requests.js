/*
Make fetch requests in the browser for each of the following tasks.
Paste your code for fetch requests here once you finish each task.
*/

/* =============================== Phase 1 ================================ */
/*
  Make a request with fetch request to GET /posts and print the response
  components to the console.
*/

// Your code here

/* =============================== Phase 2 ================================ */
/*
  Make a request with fetch request to POST /posts and print the response
  components to the console.
*/

// Your code here

const getProducts = () => {
  // fetch("/posts")
  //   .then((res) => res.json())
  //   .then((resBody) => console.log(resBody));
};

getProducts();

(async function () {
  const res = await fetch("/posts");
  const body = await res.json();
  console.log(body);
})();

const createProduct = () => {
  fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "New Post!",
    }),
  })
    .then((res) => res.json())
    .then((resBody) => console.log(resBody));
};

createProduct();
