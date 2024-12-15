let boxes = document.querySelectorAll('.box');
let newgame = document.querySelector('#new-game');
let reset = document.querySelector('#reset');
let msg = document.querySelector('#msg');
let hide = document.querySelector('.hide');

let turn0 = true;

let winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.onclick = () => {
        if (turn0) {
            box.innerText = "X";
            turn0 = false;
        } else {
            box.innerText = "O";
            turn0 = true;
        }
        box.disabled = true;
        checkwinner();
    };
});

const resetgame = () => {
    turn0 = true;
    enableboxes();
    hide.style.display = "none";
};

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    hide.style.display = "block";
    disableboxes();
};

const showtie = () => {
    msg.innerText = "It's a Tie!";
    hide.style.display = "block";
};

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showwinner(pos1val);
                return;
            }
        }
    }

    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if (allFilled) {
        showtie();
    }
};

reset.addEventListener('click', resetgame);
newgame.addEventListener('click', resetgame);
