window.addEventListener("DOMContentLoaded", async () => {
  console.log("js file linked! :)");

  const button = document.getElementById("form-button");
  const input = document.querySelector("input.form-inputs");

  const comments = await getComments();

  if (comments.length) {
    for (const comment of comments) {
      addComment(comment);
    }
  }

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    if (input.value) {
      const comment = await createComments(input.value);
      addComment(comment);
    }

    input.value = "";
  });
});

const createComments = async (comment) => {
  const response = await fetch("/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });

  const data = await response.json();
  return data;
};

const getComments = async () => {
  const response = await fetch("/comments");

  const data = await response.json();
  return data;
};

const addComment = (comment) => {
  const li = document.createElement("li");
  li.innerText = comment;

  const ul = document.getElementById("comments-list");
  ul.appendChild(li);
};
