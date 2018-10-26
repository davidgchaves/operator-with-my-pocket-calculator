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
      console.log(char);
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

// printToScreen :: String -> void
function printToScreen(message) {
  document.querySelector(".result").innerText = message;
}

// PROGRAM
start();
