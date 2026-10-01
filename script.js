const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function updateDisplay(value) {
    display.value = value || "0";
}

function calculate(a, b, operation) {
    switch (operation) {
        case "+":
            return a + b;

        case "-":
            return a - b;

        case "*":
            return a * b;

        case "/":
            if (b === 0) {
                return "Error";
            }
            return a / b;

        default:
            return b;
    }
}

function inputNumber(number) {
    if (display.value === "Error") {
        clearCalculator();
    }

    if (waitingForSecondNumber) {
        currentInput = "";
        waitingForSecondNumber = false;
    }

    if (number === "." && currentInput.includes(".")) {
        return;
    }

    currentInput += number;
    updateDisplay(currentInput);
}

function inputOperator(selectedOperator) {
    const inputValue = parseFloat(currentInput);

    if (isNaN(inputValue)) {
        return;
    }

    if (firstNumber === null) {
        firstNumber = inputValue;
    } else if (operator) {
        const result = calculate(firstNumber, inputValue, operator);

        if (result === "Error") {
            updateDisplay("Error");
            currentInput = "";
            firstNumber = null;
            operator = null;
            return;
        }

        firstNumber = result;
        updateDisplay(result);
    }

    operator = selectedOperator;
    waitingForSecondNumber = true;
}

function performCalculation() {
    if (firstNumber === null || operator === null || currentInput === "") {
        return;
    }

    const secondNumber = parseFloat(currentInput);
    const result = calculate(firstNumber, secondNumber, operator);

    updateDisplay(result);

    if (result === "Error") {
        currentInput = "";
    } else {
        currentInput = String(result);
    }

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
}

function clearCalculator() {
    currentInput = "";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay("0");
}

function deleteLastCharacter() {
    if (display.value === "Error" || waitingForSecondNumber) {
        return;
    }

    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

buttons.forEach(function(button) {
    button.addEventListener("click", function() {

        if (button.dataset.number !== undefined) {
            inputNumber(button.dataset.number);
        }

        else if (button.dataset.operator !== undefined) {
            inputOperator(button.dataset.operator);
        }

        else if (button.dataset.action === "equals") {
            performCalculation();
        }

        else if (button.dataset.action === "clear") {
            clearCalculator();
        }

        else if (button.dataset.action === "delete") {
            deleteLastCharacter();
        }
    });
});