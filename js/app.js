///// CONSTANTS /////
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 5, 6]
];



///// APP STATE (VARIABLES) /////
let board;
let turn;
let win;

///// CACHED ELEMENT REFERENCES /////
const squares = Array.from(document.querySelectorAll("#board div"));
const turnUpdate = document.querySelector("h2");


///// EVENT LISTENERS /////
window.onload = init;
document.getElementById("board").onclick = takeTurn;

///// FUNCTIONS /////

/**
 * Function that runs on page startup to render the board.
 */
function init() {
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    turn = "X";
    win = null;

    render();
}

/**
 * Responsible for updating the board appearance by looping through the board array.
 */
function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark;
    });

    turnUpdate.textContent = win ? `${win} WINS` : `TURN: ${turn}`;
}

/**
 * Alternates between placing an X or an O on the physical board, depending on the turn state of the game. 
 * @param event The HTML element being targeted.  
 */
function takeTurn(event) {
    let index;
    if (!win) {
        index = squares.findIndex(function(square) {
            return square === event.target;
        });
    }

    board[index] = turn;
    turn = turn === "X" ? "O" : "X";
    win = getWinner();

    render();
}

function getWinner() {
    let winner = null;

    winningConditions.forEach(function(condition, index) {
        if (
            board[condition[0]] && 
            board[condition[0]] === board[condition[1]] 
            && board[condition[1]] === board[condition[2]]
        ) {
            winner = board[condition[0]];
        }
    });

    return winner;
}