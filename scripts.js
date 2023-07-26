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

const equate = function (num1, num2, operator) {
  let result = 0;
  switch (operator) {
    case "\u002b":
      result = add(num1, num2);
      break;
    case "\u002d":
      result = subtract(num1, num2);
      break;
    case "\u00d7":
      result = multiply(num1, num2);
      break;
    case "\u00F7":
      result = divide(num1, num2);
      break;

    default:
      result = 0;
  }
  return result;
};

let operatorAllowed = "off";
let operatorClickCount = 0;
let number1 = "";
let number2 = "";
let equalsClickCount = 0;
let operator = "";
let result = 0;

let equationHistory = [];

// Display on the calculator
const operatorDisplay = document.querySelector(".display > .operations");

// select only the number div
const numberElements = document.querySelectorAll(".button.number");

// Create a function to call when the user clicks on a number
const numberClickEventListener = function (event) {
  if (equalsClickCount > 0 && operatorAllowed === "on") {
    return;
  }

  // store the number
  numberClicked = event.target.textContent;
  console.log(`The number clicked was ${numberClicked}`);

  if (operatorClickCount === 0) {
    number1 = number1 + numberClicked;
    console.log(`Number 1 is ${number1}`);

    //update operatorAllowed
    operatorAllowed = "on";
    console.log(`Operator allowed: ${operatorAllowed}`);
  } else if (operatorClickCount >= 1) {
    number2 = number2 + numberClicked;
    console.log(`Number 2 is ${number2}`);

    //update operatorAllowed
    operatorAllowed = "off";
    console.log(`Operator allowed: ${operatorAllowed}`);
  }

  //Display the number
  operatorDisplay.textContent =
    operatorDisplay.textContent + `${numberClicked}`;
};

// select only the operator divs
const operatorElements = document.querySelectorAll(".button.operator");

// Create a function to call when the user clicks on a operator
const operatorClickEventListener = function (event) {
  operatorClicked = event.target.textContent;
  console.log(`The operator clicked was ${operatorClicked}`);

  if (operatorAllowed === "on") {
    operatorClickCount++;
    console.log(`Operator click count: ${operatorClickCount}`);
    //add the operator to display
    operatorDisplay.textContent =
      operatorDisplay.textContent + `${operatorClicked}`;

    operator = operatorClicked;

    operatorAllowed = "off";
    console.log(`Operator allowed: ${operatorAllowed}`);
  }
};

// allow clicking on each of the number divs
numberElements.forEach(function (buttons) {
  buttons.addEventListener("click", numberClickEventListener);
});

// allow clicking on each of the operator divs
operatorElements.forEach(function (buttons) {
  buttons.addEventListener("click", operatorClickEventListener);
});

// Display on the calculator
const equalsDisplay = document.querySelector(".display > .answer");

// evaluate when the "=" button is pressed
const equalButtonElement = document.querySelector(".button.equals");
equalButtonElement.addEventListener("click", function () {
  if (operator.length > 0) {
    equalsClickCount++;
    number1Float = parseFloat(number1);
    number2Float = parseFloat(number2);

    result = equate(number1Float, number2Float, operator);

    // logic to convert weird numbers
    function formatNumber(number) {
      if (Number.isInteger(number)) {
        if (number.toString().length <= 12) {
          return number.toLocaleString(); // Return the integer with thousand separators
        } else {
          return number.toExponential(2); // Return the number in scientific notation with 2 decimal places
        }
      } else if (Number.isFinite(number)) {
        const absNumber = Math.abs(number);

        if (absNumber < 1e12) {
          const decimalPlaces = getDecimalPlaces(number);
          return decimalPlaces <= 12
            ? number.toPrecision(decimalPlaces)
            : number.toFixed(2);
        } else {
          return number.toExponential(2); // Return the number in scientific notation with 2 decimal places
        }
      } else {
        return "NaN"; // Handle non-finite numbers like Infinity and NaN
      }
    }

    function getDecimalPlaces(number) {
      const match = (number
        .toString()
        .match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/) || [""])[1];
      return match ? match.length : 0;
    }

    finalResult = formatNumber(result);

    console.log(result);

    const newEqualObject = {
      id: equalsClickCount,
      num1: number1Float,
      num2: number2Float,
      op: operator,
      res: result,
    };

    //Change the answers div
    equalsDisplay.textContent = finalResult;

    // Remove the operations display
    operatorDisplay.textContent = "";

    equationHistory.push(newEqualObject);
    console.table(equationHistory);

    // reset some of the variables
    number1 = result;
    number2 = "";
    operator = "";
    operatorClickCount = 1;
    operatorAllowed = "on";
  }
  return;
});

// clear and reset everything with the AC button
const allClearElement = document.querySelector("#allClear");
allClearElement.addEventListener("click", function () {
  console.log("All clear");

  operatorAllowed = "off";
  operatorClickCount = 0;
  number1 = "";
  number2 = "";
  equalsClickCount = 0;
  operator;
  equalsClickCount = 0;
  equationHistory = [];

  operatorDisplay.textContent = "";
  equalsDisplay.textContent = "";
});

// select the backspace character
const backspaceElement = document.querySelector("#backspace");

// all the logic to determine which variable to remove digits from
backspaceElement.addEventListener("click", function () {
  if (number1.length > 0 && operatorAllowed === "on" && number2.length === 0) {
    number1 = number1.slice(0, -1);
    operatorDisplay.textContent = operatorDisplay.textContent.slice(0, -1);
    console.log(`New number 1: ${number1}`);
  } else if (
    number1.length > 0 &&
    operatorAllowed === "off" &&
    number2.length === 0
  ) {
    operator = "";
    operatorAllowed = "on";
    operatorDisplay.textContent = operatorDisplay.textContent.slice(0, -1);
    console.log(`New operator: ${operator}`);
  } else if (
    number1.length > 0 &&
    operatorAllowed === "off" &&
    number2.length > 0
  ) {
    number2 = number2.slice(0, -1);
    operatorDisplay.textContent = operatorDisplay.textContent.slice(0, -1);
    console.log(`New number 1: ${number2}`);
  } else if (
    number1 === result &&
    operatorAllowed === "off" &&
    number2.length === 0
  ) {
    operator = "";
    operatorAllowed = "on";
    operatorDisplay.textContent = operatorDisplay.textContent.slice(0, -1);
    console.log(`New operator: ${operator}`);
  } else if (
    number1 === result &&
    operatorAllowed === "off" &&
    number2.length > 0
  ) {
    number2 = number2.slice(0, -1);
    operatorDisplay.textContent = operatorDisplay.textContent.slice(0, -1);
    console.log(`New number 1: ${number2}`);
  }
});
