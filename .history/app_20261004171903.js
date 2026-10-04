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


let line = document.querySelector(".winning-line");
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
box.classList.remove("o", "x");
}
};

drawWinningLine(winPatterns[patternIndex]);

const line = document.createElement("div");

line.classList.add("winning-line");

if (patternIndex === 0) {
    line.classList.add("line-row-1");
}
else if (patternIndex === 1) {
    line.classList.add("line-col-1");
}
else if (patternIndex === 2) {
    line.classList.add("line-diagonal-1");
}
else if (patternIndex === 3) {
    line.classList.add("line-col-2");
}
else if (patternIndex === 4) {
    line.classList.add("line-col-3");
}
else if (patternIndex === 5) {
    line.classList.add("line-diagonal-2");
}
else if (patternIndex === 6) {
    line.classList.add("line-row-2");
}
else if (patternIndex === 7) {
    line.classList.add("line-row-3");
}

document.querySelector(".game").appendChild(line);

setTimeout(() => {
    line.classList.add("show");
}, 50);

};

const showWinner = (winner, patternIndex) => {

disableBoxes();

drawWinningLine(patternIndex);

setTimeout(() => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}, 600);

};

const checkWinner = () => {

for (let i = 0; i < winPatterns.length; i++) {

    let pattern = winPatterns[i];

    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (
        pos1val !== "" &&
        pos2val !== "" &&
        pos3val !== ""
    ) {

        if (
            pos1val === pos2val &&
            pos2val === pos3val
        ) {

            showWinner(pos1val, i);
            return;
        }
    }
}

};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);