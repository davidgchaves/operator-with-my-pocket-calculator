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
      console.log(char);
      break;
    case "C":
      console.log(char);
      break;
    case "←":
      console.log(char);
      break;
    case "=":
      console.log(char);
      break;
    default:
      console.error("Something went wrong!");
      break;
  }
}

// handleNumber :: String -> ???
function handleNumber(numberString) {
  state.leftNumberString = numberString;
  printToScreen(state.leftNumberString);
}

// printToScreen :: String -> void
function printToScreen(message) {
  document.querySelector(".result").innerText = message;
}

// PROGRAM
start();
