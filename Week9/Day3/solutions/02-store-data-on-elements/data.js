// Your code here
// dom content loaded
window.addEventListener("DOMContentLoaded", () => {
  // get elements to listen on
  const addButton = document.getElementById("add");
  const type = document.getElementById("type");
  const input = document.getElementById("name");

  console.log("type value before click ", type.value);
  // get values for dom manipulation
  //   const form = document.querySelector("form"); // submit event not click
  addButton.addEventListener("click", (event) => {
    event.preventDefault();

    const inputValue = input.value;
    console.log("input value", inputValue);

    const typeValue = type.value;
    console.log("type value after click", typeValue);

    const shoppingListContainer = document.getElementById("shopping-list");

    const shoppingList = document.createElement("li");

    shoppingList.innerText = inputValue;
    shoppingList.dataset.type = typeValue
    // shoppingList.setAttribute("data-type", typeValue);
    console.log("list item ", shoppingList);
    shoppingListContainer.appendChild(shoppingList)
  });
});

// handle default behaviors if any
