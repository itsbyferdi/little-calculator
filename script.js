let inputResult = document.getElementById("result");
inputResult.value = "0";

// Empty variables for hiding the UI
let showResult = "";
let currentOperator = "";

// Flag
let replaceNumber = false; // Flag to track if the operator button was pressed
let afterEqual = false; // Flag to track if '=' button was pressed
let afterReset = false; // Flag to track if 'AC' button was pressed

// Handle number input in calculator UI
function displayNumber(number) {
  if (replaceNumber || afterEqual) {
    // Replace the current display with the new number if an operator was pressed or after '='
    inputResult.value = number; // show number in the result
    replaceNumber = false; // Reset the flag — operator is pressed
    afterEqual = false; // Reset the flag after number input
  } else {
    // Prevent multiple leading zeros
    if (inputResult.value === "0" && number === "0") {
      return;
    }
    // Prevent multiple decimal inputs
    if (number === "." && inputResult.value.includes(".")) {
      return;
    }
    // When pressing . it will always show 0. instead of .
    // Append decimals behind the 0
    else if (inputResult.value === "0" && number === ".") {
      inputResult.value += number;
      // Replace the 0 with a new number
    } else if (inputResult.value === "0" && number !== ".") {
      inputResult.value = number;
    } else {
      inputResult.value += number; // Append the number behind existing number
    }
  }
}

// Handle operator input
function inputOperator(operator) {
  if (currentOperator) {
    // Check current operator value = "";
    if (replaceNumber) {
      // Flag for tracking if the operator is already pressed
      // Case 1 — Press the same operator twice - do nothing
      if (currentOperator === operator) {
        return;
      }
      // Case 3: Press a different operator - replace with the new operator
      currentOperator = operator;
      return;
    } else {
      // Case 4: Press a number after different operators - perform the previous calculation
      inputResult.value = eval(
        showResult + currentOperator + inputResult.value
      );
      // Update showResult with the result of the previous calculation
      showResult = inputResult.value;
    }
  }

  // Set the new operator (Case 2)
  currentOperator = operator;
  // Store the current value to showResult for future calculations
  showResult = inputResult.value;
  // Prepare for next input
  replaceNumber = true;
  afterEqual = false;
}

// Handle "=" input to perform the calculation
function clearResult() {
  if (currentOperator) {
    // Perform the final calculation
    inputResult.value = eval(showResult + currentOperator + inputResult.value);
    currentOperator = ""; // Reset the operator after calculation
    showResult = ""; // Clear the stored value
    afterEqual = true; // Set the flag indicating '=' was pressed
    replaceNumber = true; // Set the flag to replace the display on next number input
  }
}

function clearOperation() {
  inputResult.value = "0";
  showResult = ""; // Clear any stored results
  currentOperator = ""; // Reset the current operator
  afterReset = true; // Reset the flag for "=" behavior
  replaceNumber = false; // Reset the flag for replacing numbers
}
