export default () => {
  const bodyChildNodes = document.body.childNodes; // NodeList [text, div, text]
  console.log("body child nodes ", bodyChildNodes);

  const div = bodyChildNodes[1]; // NOT bodyChildNodes[0]

  console.log("div ", div);
  const divChildNodes = div.childNodes; // NodeList [text, span, text]

  console.log("div child nodes ", divChildNodes);
  const helloWorld = divChildNodes[0].textContent; // Hello World!\n
  console.log("div text content ", div.textContent);
  const span = divChildNodes[1]; // <span>Yes!</span>
  // debugger
};
