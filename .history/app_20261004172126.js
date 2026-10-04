let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
[0, 1, 2],
[0, 3, 6],
[0, 4, 8],
[1, 4, 7],
[2, 5, 8],
[2, 4, 6],
[3, 4, 5],
[6, 7, 8],
];

const resetGame = () => {
turnO = true;

enableBoxes();

msgContainer.classList.add("hide");

// Remove winning line
const line = document.querySelector(".winning-line");

if (line) {
    line.remove();
}

};

boxes.forEach((box) => {

box.addEventListener("click", () => {

    if (turnO) {
        box.innerText = "O";
        box.classList.add("o");
        turnO = false;
    } else {
        box.innerText = "X";
        box.classList.add("x");
        turnO = true;
    }

    box.disabled = true;

    checkWinner();
});

});

const disableBoxes = () => {

for (let box of boxes) {
    box.disabled = true;
}

};

const enableBoxes = () => {

for (let box of boxes) {

    box.disabled = false;
    box.innerText = "";

    box.classList.remove("o");
    box.classList.remove("x");
}

};

const drawWinningLine = (pattern) => {

const game = document.querySelector(".game");

const firstBox = boxes[pattern[0]];
const lastBox = boxes[pattern[2]];

const gameRect = game.getBoundingClientRect();

const firstRect = firstBox.getBoundingClientRect();
const lastRect = lastBox.getBoundingClientRect();

// First box ke center ka position
const startX =
    firstRect.left +
    firstRect.width / 2 -
    gameRect.left;

const startY =
    firstRect.top +
    firstRect.height / 2 -
    gameRect.top;

// Last box ke center ka position
const endX =
    lastRect.left +
    lastRect.width / 2 -
    gameRect.left;

const endY =
    lastRect.top +
    lastRect.height / 2 -
    gameRect.top;

// Line ki length calculate karna
const dx = endX - startX;
const dy = endY - startY;

const length = Math.sqrt(
    dx * dx + dy * dy
);

const angle =
    Math.atan2(dy, dx) *
    (180 / Math.PI);

const line = document.createElement("div");

line.classList.add("winning-line");

line.style.width = `${length}px`;

line.style.left = `${startX}px`;

line.style.top = `${startY}px`;

line.style.transform =
    `rotate(${angle}deg)`;

game.appendChild(line);

line.animate(
    [
        {
            transform:
                `rotate(${angle}deg) scaleX(0)`
        },
        {
            transform:
                `rotate(${angle}deg) scaleX(1)`
        }
    ],
    {
        duration: 500,
        easing: "ease",
        fill: "forwards"
    }
);

};

const showWinner = (winner, patternIndex) => {

disableBoxes();

drawWinningLine(
    winPatterns[patternIndex]
);

setTimeout(() => {

    msg.innerText =
        `Congratulations, Winner is ${winner}`;

    msgContainer.classList.remove("hide");

}, 700);

};

const checkWinner = () => {

for (
    let i = 0;
    i < winPatterns.length;
    i++
) {

    let pattern = winPatterns[i];

    let pos1val =
        boxes[pattern[0]].innerText;

    let pos2val =
        boxes[pattern[1]].innerText;

    let pos3val =
        boxes[pattern[2]].innerText;

    // Check whether all three boxes are filled
    if (
        pos1val !== "" &&
        pos2val !== "" &&
        pos3val !== ""
    ) {

        if (
            pos1val === pos2val &&
            pos2val === pos3val
        ) {

            showWinner(
                pos1val,
                i
            );

            return;
        }
    }
}

};

newGameBtn.addEventListener(
"click",
resetGame
);

resetBtn.addEventListener(
"click",
resetGame
);