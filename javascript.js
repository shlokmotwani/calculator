function add(a, b){
    console.log("add function called");
    return +a + +b;
}

function subtract(a, b){
    console.log("subtract function called");
    return +a - +b;
}

function multiply(a, b){
    console.log("multiply function called");
    return +a * +b;
}

function divide(a, b){
    console.log("divide function called");
    return +a / +b;
}

function operate(a, operator, b){
    console.log("operate function called");
    let answer = 0;
    switch(operator){
        case "+":
            answer = add(a,b);
            break;
        case "-":
            answer = subtract(a,b);
            break;
        case "*":
            answer = multiply(a,b);
            break;
        case "/":
            answer = divide(a,b);
            break;
    }
    return answer;
}

const divButtons = document.querySelector("#buttons");
const divDigits = document.querySelector("#digits");
const outputField = document.querySelector("#output-field");
outputField.value = 0;
const divOperators = document.querySelector("#operators");
createDigitButtons(divDigits);
createOperatorButtons(divOperators);

let equalsButton = document.createElement("button");
equalsButton.textContent = "=";
equalsButton.style.width = "93%";
divDigits.appendChild(equalsButton);


divOperators.setAttribute("style",
`display: flex;
flex-direction: column;`);



function createDigitButtons(parent){
    let digitButtonArray = [];
    for(let i=0; i<10; i++){
        digitButtonArray[i] = document.createElement("button");
        digitButtonArray[i].textContent = i;
        digitButtonArray[0].style.width = "93%";

    }

    const row0 = document.createElement("div");
    const row1 = document.createElement("div");
    const row2 = document.createElement("div");
    const row3 = document.createElement("div");

    row0.appendChild(digitButtonArray[0]);
    row1.appendChild(digitButtonArray[1]);
    row1.appendChild(digitButtonArray[2]);
    row1.appendChild(digitButtonArray[3]);
    row2.appendChild(digitButtonArray[4]);
    row2.appendChild(digitButtonArray[5]);
    row2.appendChild(digitButtonArray[6]);
    row3.appendChild(digitButtonArray[7]);
    row3.appendChild(digitButtonArray[8]);
    row3.appendChild(digitButtonArray[9]);

    parent.appendChild(row3);
    parent.appendChild(row2);
    parent.appendChild(row1);
    parent.appendChild(row0);

}

function createOperatorButtons(parent){
    let addButton = document.createElement("button");
    addButton.textContent = "+";
    let subtractButton = document.createElement("button");
    subtractButton.textContent = "-";
    let multiplyButton = document.createElement("button");
    multiplyButton.textContent = "*";
    let divideButton = document.createElement("button");
    divideButton.textContent = "/";
    let clearButton = document.createElement("button");
    clearButton.textContent = "CLEAR";

    parent.appendChild(addButton);
    parent.appendChild(subtractButton);
    parent.appendChild(multiplyButton);
    parent.appendChild(divideButton);
    parent.appendChild(clearButton);
}

function runCalculator(){
    addEventListenersToButtons(divButtons);
}

function addEventListenersToButtons(parent){
    let firstNum = 0;
    let secondNum = 0;
    let currentOperator = "";
    let isOperatorPressed = false;
    let result = 0;

    parent.addEventListener("click", (e)=>{
        let buttonText = e.target.textContent;
        if(!String(e.target).includes("Button")){
            return;
        }
        
        if(buttonText == "CLEAR"){
            firstNum = 0;
            secondNum = 0;
            currentOperator = "";
            isOperatorPressed = false;
            result = 0;
            outputField.value = 0;
        }
        else if(buttonText == "+" ||
            buttonText == "-" ||
            buttonText == "*" || 
            buttonText == "/"){
            
            isOperatorPressed = true;
            firstNum = outputField.value;
            currentOperator = buttonText;
            console.log(`isOperatorPressed: ${isOperatorPressed}
            firstNum: ${firstNum}
            secondNum: ${secondNum}`);
            
        }
        else if(buttonText == "="){
            secondNum = outputField.value;
            console.log(`---------BEFORE = OPERATIONS--------------
            firstNum:  ${firstNum}
            secondNum:  ${secondNum}
            outputField.value: ${outputField.value}
            isOperatorPressed: ${isOperatorPressed}`);
            if(isOperatorPressed){
                result = operate(firstNum, currentOperator, secondNum);
                console.log("OPS RES = " + result);
            }
            isOperatorPressed = false;
            outputField.value = result;

            console.log(`---------AFTER = OPERATIONS--------------
            firstNum:  ${firstNum}
            secondNum:  ${secondNum}
            outputField.value: ${outputField.value}
            isOperatorPressed: ${isOperatorPressed}`);
        }
        else{
            if(outputField.value == 0){
                outputField.value = buttonText;
            }
            if(isOperatorPressed){
                outputField.value = buttonText;
            }
            outputField.value = buttonText;
        }
    })
}


runCalculator();