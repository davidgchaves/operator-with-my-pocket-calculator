const state = {
  leftNumberString: "",
  rightNumberString: "",
  operator: ""
};

document
  .querySelector(".calculator-container")
  .addEventListener("click", onClick);

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
  state.operator === ""
    ? (state.leftNumberString = "")
    : (state.rightNumberString = "");
  toScreen("0");
}

// deleteLastChar :: String -> String
const deleteLastChar = string => string.slice(0, string.length - 1);

// handleBackArrow :: void -> void
function handleBackArrow() {
  if (state.operator === "") {
    state.leftNumberString = deleteLastChar(state.leftNumberString);
    state.leftNumberString === ""
      ? toScreen("0")
      : toScreen(state.leftNumberString);
  } else {
    state.rightNumberString = deleteLastChar(state.rightNumberString);
    state.rightNumberString === ""
      ? toScreen("0")
      : toScreen(state.rightNumberString);
  }
}

// handleOperation :: String -> void
function handleOperation(operation) {
  state.operator === "" ? (state.operator = operation) : wipeState();
}

// operatorOrAnyNumberIsMissing :: State -> Bool
const operatorOrAnyNumberIsMissing = state =>
  state.operator === "" ||
  state.leftNumberString === "" ||
  state.rightNumberString === "";

// doTheMath :: Number -> Number -> String -> Number
function doTheMath(left, right, operation) {
  switch (operation) {
    case "+":
      return add(left, right);
    case "−":
      return sub(left, right);
    case "×":
      return mul(left, right);
    case "÷":
      return div(left, right);
  }
}

// fixState :: State -> void
const fixState = (state, newLeft) => {
  state.leftNumberString = newLeft;
  state.operator = "";
  state.rightNumberString = "";
};

// performOperation :: State -> void
function performOperation(state) {
  const leftNumber = parseInt(state.leftNumberString);
  const rightNumber = parseInt(state.rightNumberString);
  const result = doTheMath(leftNumber, rightNumber, state.operator);

  toScreen(String(result));
  fixState(state, String(result));
}

// handleEquals :: void -> void
function handleEquals() {
  operatorOrAnyNumberIsMissing(state) ? wipeState() : performOperation(state);
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

// wipeState :: void -> void
function wipeState() {
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
