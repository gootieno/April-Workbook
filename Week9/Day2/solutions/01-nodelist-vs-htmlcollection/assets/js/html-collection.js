export default () => {
  const bodyChildElements = document.body.children; // HTMLCollection [div]
  console.log("body child elements: ", bodyChildElements);

  const div = bodyChildElements[0];

  console.log("div ", div);
  const divChildElements = div.children; // HTMLCollection [span]
  console.log("div child elements ", divChildElements);

  for (let i = 0; i < divChildElements.length; i++) {
    const span = document.createElement("span");
    div.appendChild(span);
    console.log("span ", span);

    // span.setAttribute("class", "div-child");
    // span.style.color = "blue";
    // span.innerText = 'Hi Sam! :)'
    if (i === 100) break;
  }

  const helloWorld = div.innerText; // Hello World! Yes!    <-- NOT Hello World!
  console.log("hello word text ", helloWorld);
  const span = divChildElements[0]; // <span>Yes!</span>
  // debugger
};
