const eqDispPort = document.querySelector(".equation-display-portion");
const numDispPort = document.querySelector(".number-display-portion");
const numBtns = document.querySelectorAll(".num-btn");
const opBtns = document.querySelectorAll(".op-btn");
const clearBtn = document.querySelector("#clear-btn");
const clearAllBtn = document.querySelector("#clear-all-btn");
const backspaceBtn = document.querySelector("#backspace-btn");
const eqBtn = document.querySelector("#eq-btn");
let eqBtnPressed = false;

class numberBox {
    constructor() {
        this._showText = "";
    }
    get showText() {
        return (this._showText);
    }
    set showText(msg) {
        try {
            if (!Number(msg))
                throw TypeError;
        } catch (error) {
            throw {
                name: "TypeError",
                message: "Invalid the message should only be a number"
            };
        }
        this._showText = msg;
    }
    appendDigit(digit) {
        this._showText += digit;
    }
    deleteLastChar() {
        this._showText = this._showText.slice(0, this._showText.length - 1);
    }
    clearText() {
        this._showText = "";
    }
    renderText(HTMLelement = numDispPort) {
        HTMLelement.innerText = this._showText;
    }
};

class equationBox {
    constructor() {
        this._showText = "";
    }
    get showText() {
        return (this._showText);
    }
    set showText(msg) {
        this._showText = msg;
    }
    appendNumber(number) {
        this._showText += number;
    }
    appendOp(op) {
        this._showText += op;
    }
    clearText() {
        this._showText = "";
    }
    deleteLastChar() {
        this._showText = this._showText.slice(0, this._showText.length - 1);
    }
    renderText(HTMLelement = eqDispPort) {
        HTMLelement.innerHTML = `<span> ${this._showText} </span>`
    }
}


let nbObj = new numberBox();


let ebObj = new equationBox();


function numPressHandler() {
    if (eqBtnPressed) {
        nbObj.clearText();
        ebObj.clearText();
        nbObj.renderText();
        ebObj.renderText();
        eqBtnPressed = false;
    }
    if (!Number(nbObj.showText)) {
        nbObj.clearText();
    }
    nbObj.appendDigit(this.innerText);
    ebObj.appendNumber(this.innerText);
    nbObj.renderText();
    ebObj.renderText();
}

function opPressHandler() {
    if (eqBtnPressed) {
        ans = ebObj.showText.split("=")[1];
        ebObj.clearText();
        ebObj.appendNumber(ans);
        ebObj.renderText();
        nbObj.clearText();
        nbObj.renderText();
        eqBtnPressed = false;
    }
    ebObj.appendOp(this.innerText);
    ebObj.renderText();
    nbObj.clearText();
    nbObj.renderText();
}

function eqBtnPressHandler() {
    eqBtnPressed = true;
    let equation = ebObj.showText;
    let ans;
    try {
        ans = eval(equation);
    } catch (error) {
        console.log(error.message);
        alert("Malformed expression");
    }
    ebObj.appendOp("=");
    ebObj.appendNumber(ans);
    ebObj.renderText();
    nbObj.clearText();
    // TODO: Here when negative numbers are answers the display gets messed up
    nbObj.appendDigit(ans)
    nbObj.renderText();
}

clearBtn.addEventListener("click", () => {
    let size = nbObj.showText.length;
    nbObj.clearText();
    nbObj.renderText();
    ebObj.showText = ebObj.showText.slice(0, ebObj.showText.length - size);
    ebObj.renderText();
});

clearAllBtn.addEventListener("click", () => {
    nbObj.clearText();
    nbObj.renderText();
    ebObj.clearText();
    ebObj.renderText();
});

backspaceBtn.addEventListener("click", () => {
    nbObj.deleteLastChar();
    nbObj.renderText();
    ebObj.deleteLastChar();
    ebObj.renderText();
})

for (let numBtn of numBtns) {
    numBtn.addEventListener("click", numPressHandler);
}
for (let opBtn of opBtns) {
    opBtn.addEventListener("click", opPressHandler);
}

eqBtn.addEventListener("click", eqBtnPressHandler);