var randNum = Math.floor(Number(Math.random() * 100));
var numOfGuesses = 0;
console.log(randNum);

var startBtn = document.getElementById("start-btn")
startBtn.addEventListener("click", function() {
    startBtn.style.display = "none";
    var gameElements = document.getElementsByClassName("game-ele");
    for (let i = 0; i < gameElements.length; i++) {
        gameElements[i].style.display = "inline";
    }
});

function addNewNumber(element, number) {
    element.innerText += " " + String(number);
}

function printText(element, message, type) {
    if (type == "positive") {
        element.innerHTML = `<span style='color: green'>  ${message}  </span>`;
    } else {
        element.innerHTML = `<span style='color: red'>  ${message}  </span>`;
    }
}

var subbtn = document.getElementById("sub-btn");
subbtn.addEventListener("click", function() {
    var inputValue = document.getElementById("userGuess").value;
    inputValue = Number(inputValue);
    document.getElementById("userGuess").value = "";

    var afterFirstSubElements = document.getElementsByClassName("after-first-submit");
    for (let i = 0; i < afterFirstSubElements.length; i++) {
        afterFirstSubElements[i].style.display = "inline";
    }
    var prevGuessBox = document.getElementById("prev-guesses-box");
    addNewNumber(prevGuessBox, inputValue);
    numOfGuesses++;
    if (numOfGuesses == 10) {
        alert("Game Over!");
        document.location.reload();
    }
    inputValue = Number(inputValue);
    var resultTextBox = document.getElementById("result-text");
    if (inputValue < randNum) {
        printText(resultTextBox, "guess is too low", "negaive");
    } else if (inputValue > randNum) {
        printText(resultTextBox, "guess is too high", "negaive");
    } else {
        printText(resultTextBox, "Congrats you got it.", "positive");
        var restartBtn = document.createElement("button", value = "start again", id = "restart-btn");
        restartBtn.setAttribute("id", "restart-btn");
        restartBtn.innerText = "Start new game"
        document.getElementById("result-box").appendChild(restartBtn);
        restartBtn.addEventListener("click", () => document.location.reload());
    }
});
