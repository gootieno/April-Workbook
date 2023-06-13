/****************************** ADD DOG BUTTON ******************************/
const add = document.getElementById("add");
add.addEventListener("click", async () => {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();

    const url = data.message; // URL of new dog image
    console.log("url ", url);

    const urlParts = url.split("/");
    console.log("url parts ", urlParts);

    const dogBreed = urlParts[4];
    /*--------------- Get breed (Hint: Parse from URL) ---------------- */
    // Your code here

    /*------------ Create new dog card with the url above ------------- */
    /* (use the HTML structure for the current dog image in the index.html
            file to create a new image with the url) */
    // Your code here

    /* Add the new dog card as a child to the ul in the .gallery element */
    // Your code here

    /*
            <li>
                <figure>
                    <img src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg" />
                    <figcaption>hound-afghan</figcaption>
                </figure>
            </li>

            1.create all elements needed
            2.add attributes to correct elements and inner text values if applicable
            3.select live element on the page
            4.append all new elements in order
            5.append top level created element to an element that exists on the html page
            
        */
    const li = document.createElement("li");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    img.setAttribute("src", url);
    figCaption.innerText = dogBreed;

    const ul = document.querySelector("ul");

    // ul > li > figure > [img, figcaption]

    figure.append(img, figCaption);
    li.appendChild(figure);

    // li.style.borderColor = "red";
    li.setAttribute("class", "active-border");
    // document.body.style.backgroundColor = "grey";

    console.log("li", li);
    ul.appendChild(li);
  } catch (e) {
    console.log("Couldn't fetch dog :(");
  }
});

/************************** REMOVE FIRST DOG BUTTON **************************/
const removeFirst = document.getElementById("remove-first");
removeFirst.addEventListener("click", () => {
  /*-------------------- Select the first dog card --------------------- */
  // Your code here
  /*-------------------- Remove the first dog card --------------------- */
  // Your code here
  const firstDog = document.querySelector("section.gallery > ul").children[0];

  if (firstDog) firstDog.remove();
});

/************************** REMOVE LAST DOG BUTTON ***************************/
const removeLast = document.getElementById("remove-last");
removeLast.addEventListener("click", () => {
  /*-------------------- Select the last dog card ----------------------- */
  // Your code here
  /*-------------------- Remove the last dog card ----------------------- */
  // Your code here
  const lastDog = document.querySelector(".gallery ul li:last-child");

  if (lastDog) lastDog.remove();
});
