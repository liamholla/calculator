const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

let operatorText = "";
let operatorAllowed = "off";
let operatorClickCount = 0;
let displayValue = "";

let numberArray = [
  {
    id: 0,
    number: 0,
  },
];

let operatorArray = [];

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

  // Add the number to the numberArray, this is so we can store multiple
  // numbers
  const nObj = numberArray.find((item) => item.id === operatorClickCount);
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
    operatorArray.push(newOpObj);
    console.log(operatorArray);

    // add a new member to the array
    const newNumObj = {
      id: operatorClickCount,
      number: 0,
    };

    //add new object to number array
    numberArray.push(newNumObj);
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

// clear and reset everything with the AC button
const allClearElement = document.querySelector("#allClear");
allClearElement.addEventListener("click", function () {
  console.log("All clear");

  operatorText = "";
  operatorAllowed = "off";
  operatorClickCount = 0;
  displayValue = "";
  calcDisplay.textContent = displayValue;

  numberArray = [
    {
      id: 0,
      number: "",
    },
  ];

  operatorArray = [];
});

// evaluate when the "=" button is pressed
const equalButtonElement = document.querySelector(".button.equals");
equalButtonElement.addEventListener("click", function () {
  // sort the operators in ascending order
  const operatorSorted = operatorArray.sort(function (a, b) {
    if (a.order < b.order) {
      return -1;
    } else if (a.order > b.order) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log(operatorSorted);

  const operatorArrayLength = operatorSorted.length;
  console.log(operatorSorted.length);

  for (i = 0; i < operatorArrayLength; i++) {
    const operatorID = operatorSorted[i].id;
    const operatorSign = operatorSorted[i].operator;
    const numberA = Number(numberArray[operatorID].number);
    const numberB = Number(numberArray[operatorID + 1].number);

    const textToDo = `${numberA} ${operatorSign} ${numberB}`;
    console.log(textToDo);

    if (operatorSign === "\u00F7") {
      console.log(divide(numberA, numberB));
      // return divide(numberA, numberB);
    }
  }
});
