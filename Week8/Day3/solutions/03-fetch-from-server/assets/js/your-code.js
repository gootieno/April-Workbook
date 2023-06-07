export function getAllDogs() {
  // Your code here
  const url = "/dogs";
  return fetch(url);
}

export function getDogNumberTwo() {
  // Your code here
  const url = "/dogs/2";
  return fetch(url);
}

export function postNewDog() {
  // Your code here

  const url = "/dogs";
  const headers = { "Content-Type": "application/x-www-form/url-encoded" };
  const body = new URLSearchParams({
    name: "Kaido",
    age: 0.4,
  });

  const options = {
    method: "POST",
    headers,
    body,
  };

  return fetch(url, options)
}

export function postNewDogV2(name, age) {
  // Your code here
  return fetch('/dogs', {
    method: 'POST',
    headers:{ "Content-Type": "application/x-www-form/url-encoded" },
    body: new URLSearchParams({name, age})
  })
}

export function deleteDog(id) {
  // Your code here
  return fetch(`/dogs/${id}/delete`, {
    method: "POST",
    headers: {AUTH: "ckyut5wau0000jyv5bsrud90y"},
  });
}
