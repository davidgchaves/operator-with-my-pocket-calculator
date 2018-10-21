const state = {
  leftNumberString: "",
  rightNumberString: "",
  operator: ""
};

const container = document.querySelector(".calculator-container");
container.addEventListener("click", onClick);

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

function handleC() {
  if (state.operator === "") {
    state.leftNumberString = "";
    toScreen("0");
  } else {
    state.rightNumberString = "";
    toScreen("0");
  }
}

function handleBackArrow() {
  if (state.operator === "") {
    state.leftNumberString = state.leftNumberString.slice(
      0,
      state.leftNumberString.length - 1
    );
    if (state.leftNumberString === "") {
      toScreen("0");
    } else {
      toScreen(state.leftNumberString);
    }
  } else {
    state.rightNumberString = state.rightNumberString.slice(
      0,
      state.rightNumberString.length - 1
    );
    if (state.rightNumberString === "") {
      toScreen("0");
    } else {
      toScreen(state.rightNumberString);
    }
  }
}

function handleOperation(operation) {
  if (state.operator === "") {
    state.operator = operation;
  } else {
    /* CANNOT HANDLE 2 OPERATORS */
    cleanData();
  }
}

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

function handleNumber(textNumber) {
  if (state.operator === "") {
    state.leftNumberString += textNumber;
    toScreen(state.leftNumberString);
  } else {
    state.rightNumberString += textNumber;
    toScreen(state.rightNumberString);
  }
}

function cleanData() {
  state.leftNumberString = "";
  state.rightNumberString = "";
  state.operator = "";
  toScreen("0");
}

const add = (x, y) => x + y;
const sub = (x, y) => x - y;
const mul = (x, y) => x * y;
const div = (x, y) => x / y;

function toScreen(x) {
  document.querySelector(".result").innerHTML = x;
}
