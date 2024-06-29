const outputField = document.querySelector("#output-field");
const divButtons = document.querySelector("#buttons");
const divDigits = document.querySelector("#digits");
const divOperators = document.querySelector("#operators");
const equalsButton = document.createElement("button");
const op_symbols = ["+", "-", "*", "/", "CLEAR"];

outputField.value = 0;
equalsButton.textContent = "=";
equalsButton.style.width = "93%";

divOperators.setAttribute(
  "style",
  `display: flex;
  flex-direction: column;`
);

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
  let answer = 0;
  switch (operator) {
    case "+":
      answer = add(a, b);
      break;
    case "-":
      answer = subtract(a, b);
      break;
    case "*":
      answer = multiply(a, b);
      break;
    case "/":
      answer = divide(a, b);
      break;
  }
  return answer;
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

function runCalculator() {
  addEventListenersToButtons(divButtons);
}

function addEventListenersToButtons(parent) {
  let firstNum = 0;
  let secondNum = 0;
  let currentOperator = "";
  let isOperatorPressed = false;
  let result = 0;

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
          secondNum = +outputField.value;
          result = operate(firstNum, currentOperator, secondNum);
          firstNum = result;
          secondNum = null;
          outputField.value = result;
          currentOperator = "";
        } else {
          firstNum = +outputField.value;
        }
      }
      isOperatorPressed = true;
      currentOperator = buttonText;
    } else if (buttonText == "=") {
      secondNum = +outputField.value;

      result = operate(firstNum, currentOperator, secondNum);
      isOperatorPressed = false;
      currentOperator = "";
      outputField.value = result;
      firstNum = secondNum;
      secondNum = null;
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
  });
}

createDigitButtons(divDigits);
createOperatorButtons(divOperators);
divDigits.appendChild(equalsButton);

runCalculator();
