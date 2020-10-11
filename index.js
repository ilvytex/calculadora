// We start by getting to targeting our elements with the data attributes attached to it in the HTML file

const numberButtons = document.querySelectorAll("[data-number]");

const operationButtons = document.querySelectorAll("[data-operation]");

const equalsButton = document.querySelector("[data-equals]");

const deleteButton = document.querySelector("[data-delete]");

const allClearButton = document.querySelector("[data-all-clear]");

const currentScreenTextElement = document.querySelector(
  "[data-operand-current]"
);

const previousScreenTextElement = document.querySelector(
  "[data-operand-previous]"
);



//  create a class that will hold all the functions to perform mathematical operations with the calculator.

class Calculator {
  constructor(currentScreenTextElement, previousScreenTextElement) {
    this.currentScreenTextElement = currentScreenTextElement;
    this.previousScreenTextElement = previousScreenTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;
    this.previousScreenTextElement.innerText = "";

  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  flushOperator(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;

      case "-":
        computation = previous - current;
        break;

      case "×":
        computation = previous * current;
        break;

      case "÷":
        computation = previous / current;
        break;

      default:
        return;
    }
    this.currentOperand = computation;
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.currentScreenTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    }
  }
}



// We create a calculator variable and set it equal to new Calculator()and pass the properties from our class constructor into it.We add eventListeners to our buttons when they are clicked on and call our class methods.

const calculator = new Calculator(
  currentScreenTextElement,
  previousScreenTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.flushOperator(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});