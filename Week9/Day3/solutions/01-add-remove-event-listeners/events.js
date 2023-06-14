// Your code here
window.addEventListener("DOMContentLoaded", () => {
  // alert('Dom has loaded!')

  // When the #red-input input contains the word "red",
  // change the background color of the input to red.
  // Otherwise, remain transparent.

  // get element with #red-input
  const redInput = document.getElementById("red-input");
  // add event listener to #red-input element and listen for an event

  const changeRed = (event) => {
    // console.log("event ", event.target.value);
    // same as redInput.value
    // const value = event.target.value
    const value = redInput.value;
    // write conditional to check if input value is red or not red
    if (value.toLowerCase().includes("red")) {
      redInput.style.backgroundColor = "red";
    } else {
      redInput.style.backgroundColor = "transparent";
    }
  };
  redInput.addEventListener("input", changeRed);

  // get #add-item element
  const input = document.getElementById("list-add");
  // get #list-add element
  const addButton = document.getElementById("add-item");
  // listen to #add-item element on click
  const addList = () => {
    // get value from #list-add
    const value = input.value;
    // create li element with list add value for inner text
    const li = document.createElement("li");
    li.innerText = value;
    // get ul from the dom
    const ul = document.querySelector("ul");
    // append li to ul
    ul.appendChild(li);

    input.value = "";
  };
  addButton.addEventListener("click", addList);

  // get #color-select element
  const colorInput = document.querySelector("#color-select");
  // get section element thats #color-select's parent
  const colorSection = document.querySelector("#section-3");
  // listen for change in #color-select
  const changeColor = () => {
    // change section background color to #color-selects value
    const selectedColor = colorInput.value;
    colorSection.style.backgroundColor = selectedColor;
  };
  colorInput.addEventListener("change", changeColor);

  const removeListeners = document.getElementById("remove-listeners");

  

  removeListeners.addEventListener("click", () => {
    redInput.removeEventListener("input", changeRed);
    addButton.removeEventListener("click", addList);
    colorInput.removeEventListener("change", changeColor);
    // document.body.style.backgroundColor = 'blue'
  });
});
/*
 */
