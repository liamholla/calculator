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

let operatorText = "";
let operatorAllowed = "off";
let operatorClickCount = 0;
let displayValue = "";

let numberObject = [
  {
    id: 0,
    number: "",
  },
];

let operatorObject = [];

let orderOfOperations = [
  {
    symbol: "^",
    order: 1,
  },
  {
    symbol: "\u00F7",
    order: 2,
  },
  {
    symbol: "\u00d7",
    order: 3,
  },
  {
    symbol: "\u002b",
    order: 4,
  },
  {
    symbol: "\u002d",
    order: 5,
  },
];

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

  // Add the number to the numberObject array, this is so we can store multiple
  // numbers
  const nObj = numberObject.find((item) => item.id === operatorClickCount);
  nObj.number = nObj.number + numberClicked;
  console.log(nObj);

  //Display the number
  calcDisplay.textContent = calcDisplay.textContent + `${numberClicked}`;

  //update operatorAllowed
  operatorAllowed = "on";
  console.log(`Operator allowed: ${operatorAllowed}`);
};

// select only the operator divs
const operatorElements = document.querySelectorAll(".button.operator");

// Create a function to call when the user clicks on a operator
const operatorClickEventListener = function (event) {
  operatorClicked = event.target.textContent;
  console.log(`The operator clicked was ${operatorClicked}`);
  operatorClicked;

  if (operatorAllowed === "on") {
    operatorClickCount++;
    console.log(`Operator click count: ${operatorClickCount}`);
    //add the operator to display
    calcDisplay.textContent = calcDisplay.textContent + `${operatorClicked}`;

    // add in the order of the operation to the array
    const orderObj = orderOfOperations.find((item) => {
      return item.symbol === operatorClicked;
    });
    console.log(orderObj);
    orderToSort = orderObj.order;

    //Add a new object to the operator array
    const newOpObj = {
      id: operatorClickCount - 1,
      operator: operatorClicked,
      order: orderToSort,
    };

    //Push that object to the array
    operatorObject.push(newOpObj);
    console.log(operatorObject);

    // add a new member to the array
    const newNumObj = {
      id: operatorClickCount,
      number: "",
    };

    //add new object to number array
    numberObject.push(newNumObj);
  }

  operatorAllowed = "off";
  console.log(`Operator allowed: ${operatorAllowed}`);
};

// allow clicking on each of the number divs
numberElements.forEach(function (buttons) {
  buttons.addEventListener("click", numberClickEventListener);
});

// allow clicking on each of the operator divs
operatorElements.forEach(function (buttons) {
  buttons.addEventListener("click", operatorClickEventListener);
});

const allClearElement = document.querySelector("#allClear");
allClearElement.addEventListener("click", function () {
  console.log("All clear");

  operatorText = "";
  operatorAllowed = "off";
  operatorClickCount = 0;
  displayValue = "";
  calcDisplay.textContent = displayValue;

  numberObject = [
    {
      id: 0,
      number: "",
    },
  ];

  operatorObject = [];
});
