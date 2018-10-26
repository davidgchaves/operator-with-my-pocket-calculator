// GLOBAL STATE
const state = {
  leftNumberString: "",
  rightNumberString: "",
  operator: ""
};

// start :: void -> void
function start() {
  document
    .querySelector(".calculator-container")
    .addEventListener("click", onClick);
}

// onClick :: Event -> void
function onClick(event) {
  const char = event.target.innerText;
  switch (char) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      handleNumber(char);
      break;

    case "+":
    case "−":
    case "×":
    case "÷":
      handleOperator(char);
      break;
    case "C":
      handleC();
      break;
    case "←":
      handleBackArrow();
      break;
    case "=":
      handleEquals();
      break;
    default:
      console.error("Something went wrong!");
      break;
  }
}

// handleNumber :: String -> void
function handleNumber(numberString) {
  if (state.operator === "") {
    state.leftNumberString = state.leftNumberString + numberString;
    printToScreen(state.leftNumberString);
    console.log(`left guardado: ${state.leftNumberString}`);
  } else {
    state.rightNumberString = state.rightNumberString + numberString;
    printToScreen(state.rightNumberString);
    console.log(`right guardado: ${state.rightNumberString}`);
  }
}

// handleOperator :: String -> void
function handleOperator(operator) {
  state.operator = operator;
  console.log(`operador guardado: ${state.operator}`);
}

// handleEquals :: void -> void
function handleEquals() {
  let result;

  switch (state.operator) {
    case "+":
      result =
        parseInt(state.leftNumberString) + parseInt(state.rightNumberString);
      break;
    case "−":
      result =
        parseInt(state.leftNumberString) - parseInt(state.rightNumberString);
      break;
    case "×":
      result =
        parseInt(state.leftNumberString) * parseInt(state.rightNumberString);
      break;
    case "÷":
      result =
        parseInt(state.leftNumberString) / parseInt(state.rightNumberString);
      break;
    default:
      console.error("WHAT!");
      break;
  }

  printToScreen(String(result));
}

// handleC :: void -> void
function handleC() {
  if (state.operator === "") {
    state.leftNumberString = "";
  } else {
    state.rightNumberString = "";
  }

  printToScreen("0");
}

// handleBackArrow :: void -> void
function handleBackArrow() {
  if (state.operator === "") {
    state.leftNumberString = deleteLastCharFrom(state.leftNumberString);
    if (state.leftNumberString === "") {
      printToScreen("0");
    } else {
      printToScreen(state.leftNumberString);
    }
  } else {
    state.rightNumberString = deleteLastCharFrom(state.rightNumberString);
    if (state.rightNumberString === "") {
      printToScreen("0");
    } else {
      printToScreen(state.rightNumberString);
    }
  }
}

// deleteLastCharFrom :: String -> String
const deleteLastCharFrom = numberString =>
  numberString.slice(0, numberString.length - 1);

// printToScreen :: String -> void
function printToScreen(message) {
  document.querySelector(".result").innerText = message;
}

// PROGRAM
start();
