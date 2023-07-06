const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (array) {
  return array.length
    ? array.reduce((accumulator, nextItem) => accumulator * nextItem)
    : 0;
};

const divide = function (array) {
  return array.length
    ? array.reduce((accumulator, nextItem) => accumulator / nextItem)
    : 0;
};

let num1 = 1;
let num2 = 1;
let operator;

const operate = function (num1, num2, operator) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply([num1, num2]);
      break;
    case "/":
      result = divide([num1, num2]);
      break;

    default:
      result = 0;
  }
  return result;
};

// Display on the calculator
const calcDisplay = document.querySelector(".display");

// select only the number divs
const numberElements = document.querySelectorAll(".button.number");

// Create a function to call when the user clicks on a number
const numberClickEventListener = function (event) {
  console.log(event.target.textContent);
  let numberText = event.target.textContent;

  calcDisplay.textContent = calcDisplay.textContent + `${numberText}`;
  numberText = calcDisplay.textContent;
  console.log(numberText);
};

// allow clicking on each of the number divs
numberElements.forEach(function (buttons) {
  buttons.addEventListener("click", numberClickEventListener);
});

/*
// select all of the column divs
const buttonElements = document.querySelectorAll(".button");

buttonElements.forEach(function (buttons) {
  buttons.addEventListener("click", buttonClickEventListener);
});
*/
