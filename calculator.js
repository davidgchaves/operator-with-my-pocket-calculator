const state = {
  leftNumberString: "",
  rightNumberString: "",
  operator: ""
};

const container = document.querySelector(".calculator-container");
container.addEventListener("click", onClick);

// onClick :: Event -> void
function onClick(event) {
  const char = event.target.innerText;
  switch (char) {
    case "C":
      handleC();
      break;
    case "←":
      handleBackArrow();
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleOperation(char);
      break;
    case "=":
      handleEquals();
      break;
    default:
      handleNumber(char);
  }
}

// handleC :: void -> void
function handleC() {
  if (state.operator === "") {
    state.leftNumberString = "";
    toScreen("0");
  } else {
    state.rightNumberString = "";
    toScreen("0");
  }
}

// deleteLastChar :: String -> String
function deleteLastChar(string) {
  return string.slice(0, string.length - 1);
}

// handleBackArrow :: void -> void
function handleBackArrow() {
  if (state.operator === "") {
    state.leftNumberString = deleteLastChar(state.leftNumberString);
    if (state.leftNumberString === "") {
      toScreen("0");
    } else {
      toScreen(state.leftNumberString);
    }
  } else {
    state.rightNumberString = deleteLastChar(state.rightNumberString);
    if (state.rightNumberString === "") {
      toScreen("0");
    } else {
      toScreen(state.rightNumberString);
    }
  }
}

// handleOperation :: String -> void
function handleOperation(operation) {
  if (state.operator === "") {
    state.operator = operation;
  } else {
    /* CANNOT HANDLE 2 OPERATORS */
    cleanData();
  }
}

// handleEquals :: void -> void
function handleEquals() {
  if (
    state.operator === "" ||
    state.leftNumberString === "" ||
    state.rightNumberString === ""
  ) {
    cleanData();
  } else {
    const leftNumber = parseInt(state.leftNumberString);
    const rightNumber = parseInt(state.rightNumberString);
    let result;
    switch (state.operator) {
      case "+":
        result = add(leftNumber, rightNumber);
        break;
      case "−":
        result = sub(leftNumber, rightNumber);
        break;
      case "×":
        result = mul(leftNumber, rightNumber);
        break;
      case "÷":
        result = div(leftNumber, rightNumber);
        break;
    }

    toScreen(result);
    state.leftNumberString = result;
    state.operator = "";
    state.rightNumberString = "";
  }
}

// handleNumber :: String -> void
function handleNumber(textNumber) {
  if (state.operator === "") {
    state.leftNumberString += textNumber;
    toScreen(state.leftNumberString);
  } else {
    state.rightNumberString += textNumber;
    toScreen(state.rightNumberString);
  }
}

// cleanData :: void -> void
function cleanData() {
  state.leftNumberString = "";
  state.rightNumberString = "";
  state.operator = "";
  toScreen("0");
}

// add :: Number -> Number -> Number
const add = (x, y) => x + y;

// sub :: Number -> Number -> Number
const sub = (x, y) => x - y;

// mul :: Number -> Number -> Number
const mul = (x, y) => x * y;

// div :: Number -> Number -> Number
const div = (x, y) => x / y;

// toScreen :: String -> void
function toScreen(x) {
  document.querySelector(".result").innerHTML = x;
}
