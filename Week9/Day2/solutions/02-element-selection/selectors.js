const select = () => {
  /* Write queries for each of the following */

  /* Section 1 */
  // 1. Get all seeded fruit elements
  // Your code here
  let seeded = document.querySelectorAll("li.seed");
  console.log("seeded ", seeded);
  // 2. Get all seedless fruit elements
  // Your code here
  const seedLessFruits = document.getElementsByClassName("seedless");
  console.log("seedless fruits ", seedLessFruits);
  // 3. Get first seedless fruit element
  // Your code here
  const firstSeedless = document.querySelector("li.seedless");
  console.log("first seedless: ", firstSeedless);
  /* Section 2 */
  // 4. Get inner span with text "you"
  // Your code here
  const span = document.querySelector("#wrapper span");
  console.log("span text: ", span.innerText);

  // 5. Get all children of element "wrapper"
  // Your code here
  const wrapperChildren = document.getElementById("wrapper").children;
  console.log("#wrapper children ", wrapperChildren);
  // 6. Get all odd number list items in the list
  // Your code here
  const oddNumbers = document.querySelectorAll(".odd");
  console.log("odd numbers ", oddNumbers);

  // 7. Get all even number list items in the list
  // Your code here
  const evens = [];
  for (let i = 0; i < oddNumbers.length; i++) {
    evens.push(oddNumbers[i].nextElementSibling);
  }
  console.log("even numbers ", evens);

  //   const evenNums = document.querySelectorAll('#two > ol > li:not(.odd)')
  //   console.log('even nums 2', evenNums)
  /* Section 3 */
  // 8. Get all tech companies without a class name
  // Your code here
  const classLess = document.querySelectorAll("a:not([class])");
  console.log("classless tech companies: ", classLess);
  // 9. Get "Amazon" list element
  // Your code here
  let amazon = document.querySelector(" a.shopping");
  console.log("amazon ", amazon);
  // 10. Get all unicorn list elements (not the image element)
  // Your code here
  const unicornArray = [];
  const unicorn = document.querySelectorAll(".unicorn");
  for (let el of unicorn) {
    unicornArray.push(el.parentElement);
  }

  console.log("unicorn list elements ", unicornArray);
};

window.onload = select;
