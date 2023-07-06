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

let numberText1 = "";
let numberText2 = "";
let operatorText = "";
let operatorAllowed = "off";
let operatorClickCount = 0;
let displayValue = "";

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

// select only the number div
const numberElements = document.querySelectorAll(".button.number");

// Create a function to call when the user clicks on a number
const numberClickEventListener = function (event) {
  // store the number
  numberClicked = event.target.textContent;
  console.log(`The number clicked was ${numberClicked}`);

  if (operatorClickCount === 0) {
    numberText1 = numberText1 + event.target.textContent;
    //display the number
    calcDisplay.textContent = calcDisplay.textContent + `${numberClicked}`;
  } else if (operatorClickCount === 1) {
    numberText2 = numberText2 + event.target.textContent;
    //display the number
    calcDisplay.textContent = calcDisplay.textContent + `${numberClicked}`;
  }

  console.log(`The number text 1 value is : ${numberText1}`);
  console.log(`The number text 2 value is : ${numberText2}`);
  //update operatorAllowed
  operatorAllowed = "on";
  console.log(`Operator allowed: ${operatorAllowed}`);

  return numberText1;
};

// select only the operator divs
const operatorElements = document.querySelectorAll(".button.operator");

// Create a function to call when the user clicks on a operator
const operatorClickEventListener = function (event) {
  operatorClicked = event.target.textContent;
  console.log(`The operator clicked was ${operatorClicked}`);
  operatorText = operatorClicked;

  if (operatorAllowed === "on") {
    operatorClickCount++;
    console.log(`Operator click count: ${operatorClickCount}`);
    //add the operator to display
    calcDisplay.textContent = calcDisplay.textContent + `${operatorClicked}`;
  }
  operatorAllowed = "off";
  console.log(`Operator allowed: ${operatorAllowed}`);

  return operatorText;
};

// allow clicking on each of the number divs
numberElements.forEach(function (buttons) {
  buttons.addEventListener("click", numberClickEventListener);
});

// allow clicking on each of the operator divs
operatorElements.forEach(function (buttons) {
  buttons.addEventListener("click", operatorClickEventListener);
});

/*
// select all of the column divs
const buttonElements = document.querySelectorAll(".button");

buttonElements.forEach(function (buttons) {
  buttons.addEventListener("click", buttonClickEventListener);
});
*/
