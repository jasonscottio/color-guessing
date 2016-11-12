
var numSquares = 6;
var colors = [];
var squares = document.querySelectorAll(".square");
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.getElementsByClassName("mode");


init();


function init() {
    //generates an array of colors
    colors = generateRandomColors(numSquares);
    //picks the winning color
    pickedColor = pickColor();
    //displays the hint RGB value
    colorDisplay.textContent = pickedColor + " ?";
    setBackgrounds();
    squaresEvents();
    buttonEvents();

}

function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    //sets random RGB Values and returns a string
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return ("rgb(" + r + ", " + g + ", " + b + ")");
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor + " ?";
    resetButton.textContent = "New Colors";
    h1.style.background = "#61247D";
    messageDisplay.textContent = "";
    setBackgrounds();
}

function buttonEvents() {
    resetButton.addEventListener("click", function () {
        reset();
    });
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }

            reset();
        });
    }
}

function setBackgrounds() {
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }

    }
}

function squaresEvents() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style["background-color"];
            if (clickedColor === pickedColor) {
                resetButton.textContent = "Play Again?";
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
            } else {
                messageDisplay.textContent = "Try Again";
                this.style.background = "#2F2C30";
            }
        });
    }
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}



