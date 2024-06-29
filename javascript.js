let outputField;
let divButtons;
let divDigits;
let divOperators;
let equalsButton;
let op_symbols;

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  return +a / +b;
}

function operate(a, operator, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function createDigitButtons(parent) {
  let digitButtonsArray = []; //stores all the digit buttons
  let digitButtonRowsArray = []; //stores all the button rows

  //creates digit buttons from 0-9 and pushes them into digitButtonsArray
  for (let i = 0; i < 10; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    digitButtonsArray.push(btn);
  }

  digitButtonsArray[0].style.width = "93%";

  for (let i = 0; i < 4; i++) {
    digitButtonRowsArray.push(document.createElement("div"));
  }

  let count = 0;
  for (let i = 0; i < 4; i++) {
    digitButtonRowsArray[i].appendChild(digitButtonsArray[count++]);
    if (i > 0) {
      digitButtonRowsArray[i].appendChild(digitButtonsArray[count++]);
      digitButtonRowsArray[i].appendChild(digitButtonsArray[count++]);
    }
  }

  for (let i = 3; i >= 0; i--) {
    parent.appendChild(digitButtonRowsArray[i]);
  }
}

function createOperatorButtons(parent) {
  for (let i = 0; i < op_symbols.length; i++) {
    let btn = document.createElement("button");
    btn.textContent = op_symbols[i];
    parent.appendChild(btn);
  }
}

function setUpVariables() {
  outputField = document.querySelector("#output-field");
  divButtons = document.querySelector("#buttons");
  divDigits = document.querySelector("#digits");
  divOperators = document.querySelector("#operators");
  equalsButton = document.createElement("button");
  op_symbols = ["+", "-", "*", "/", "CLEAR"];

  outputField.value = 0;
  equalsButton.textContent = "=";
  equalsButton.style.width = "93%";

  divOperators.setAttribute(
    "style",
    `display: flex;
    flex-direction: column;`
  );
}

function runCalculator() {
  setUpVariables();
  createDigitButtons(divDigits);
  createOperatorButtons(divOperators);
  divDigits.appendChild(equalsButton);
  addEventListenersToButtons(divButtons);
}

function addEventListenersToButtons(parent) {
  let firstNum = 0;
  let secondNum = 0;
  let currentOperator = "";
  let isOperatorPressed = false;
  let result = 0;
  let isEqualsPressed = false;

  parent.addEventListener("click", (e) => {
    let buttonText = e.target.textContent;
    if (!String(e.target).includes("Button")) {
      return;
    }

    if (buttonText == "CLEAR") {
      firstNum = null;
      secondNum = null;
      currentOperator = "";
      isOperatorPressed = false;
      result = 0;
      outputField.value = 0;
    } else if (op_symbols.includes(buttonText)) {
      if (!isOperatorPressed) {
        if (firstNum) {
          if (!isEqualsPressed) {
            secondNum = +outputField.value;
            result = operate(firstNum, currentOperator, secondNum);
            firstNum = result;
            secondNum = null;
            outputField.value = result;
            currentOperator = "";
          } else {
            currentOperator = buttonText;
          }
        } else {
          firstNum = +outputField.value;
        }
      }
      isOperatorPressed = true;
      currentOperator = buttonText;
    } else if (buttonText == "=") {
      if (!isEqualsPressed) {
        isEqualsPressed = true;
        secondNum = +outputField.value;
        result = operate(firstNum, currentOperator, secondNum);
        isOperatorPressed = false;
        currentOperator = "";
        outputField.value = result;
        firstNum = result;
        secondNum = null;
      }
    } else {
      if (outputField.value == 0) {
        outputField.value = buttonText;
      } else {
        if (isOperatorPressed) {
          outputField.value = buttonText;
          isOperatorPressed = false;
        } else {
          outputField.value += buttonText;
        }
      }
    }
    if (buttonText != "=") {
      isEqualsPressed = false;
    }
  });
}

runCalculator();
