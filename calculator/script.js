const eqDispPort = document.querySelector(".equation-display-portion");
const numDispPort = document.querySelector(".number-display-portion");
const numBtns = document.querySelectorAll(".num-btn");
const opBtns = document.querySelectorAll(".op-btn");
const clearBtn = document.querySelector("#clear-btn");
const backspaceBtn = document.querySelector("#backspace-btn");
const eqBtn = document.querySelector("#eq-btn");

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


//Testing lines
let nbObj = new numberBox();
nbObj.showText = "42";
nbObj.renderText();
setTimeout(function() {
    nbObj.clearText();
    nbObj.renderText();
}, 3000);