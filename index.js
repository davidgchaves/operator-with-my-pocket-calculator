// start :: void -> void
function start() {
  document
    .querySelector(".calculator-container")
    .addEventListener("click", onClick);
}

// onClick :: Event -> void
function onClick(event) {
  console.log(event.target.innerText);
}

// printToScreen :: String -> void
function printToScreen(message) {
  document.querySelector(".result").innerText = message;
}

// PROGRAM
start();
