// Search for elements
const board = document.getElementById("game_board");

// Declare constant values
const board_size = 10;
const cell_size = 80 / board_size;
const minesCount = 15

// Declare variables
var virtual_board = [];


// Exxecute functions
addEventListener("load", onInit);

// Execute on page initialization
function onInit () {

    createVirtualBoard(board_size);
    drawBoard(virtual_board);
}

// ------------------------------ VIRTUAL BOARD ------------------------------

function createVirtualBoard(board_size) {

    // Declare variables
    var virtual_board_in = [];

    // Create all cells and array
    for(i = 0; i < board_size; i++) {
        for(j = 0; j < board_size; j++) {

            virtual_board_in.push(0);

        }

        virtual_board.push(virtual_board_in);
        virtual_board_in = [];

    }

    assignMinesOnBoard(minesCount);

    for(k = 0; k < board_size; k++) {
        for(l = 0; l < board_size; l++) {
            if(virtual_board[k][l] != -1){
                virtual_board[k][l] = countMines(k, l);
            }
        }
    }

}

// Put mines in appropriate places
function assignMinesOnBoard(minesCount) {

    var i = minesCount;

    while(i > 0) {
        var x = Math.floor(Math.random() * board_size);
        var y = Math.floor(Math.random() * board_size)

        if(canPutTheMine(x, y)) {
            virtual_board[x][y] = -1;
            i--;
        }
    }

}

// Check if mine can be put on that cell
function canPutTheMine(x, y) {
    if(virtual_board[x][y] != -1) {
        return true;
    }
}

// Count all mines in surrounding
function countMines(x, y) {

    minesInSurrounding = 0;

    for(i = x - 1; i <= x + 1; i++) {

        if(i < 0 || i >= board_size){ continue; }

        for(j = y - 1; j <= y + 1; j++) {

            if(j < 0 || j >= board_size){ continue; }

            if(virtual_board[i][j] == -1) { minesInSurrounding++; }
        }
    }

    return minesInSurrounding;
}

// ------------------------------ PHYSICAL BOARD ------------------------------

function drawBoard(virtual_board) {

    // Set grid template dynamically
    board.style.gridTemplateColumns = "repeat(" + board_size + ", " + cell_size + "vmin)";
    board.style.gridTemplateRows = "repeat(" + board_size + ", " + cell_size + "vmin)";

    var column_id = 0;
    var row_id;

    // Create cells
    for(i = 0; i < board_size; i++) {

        row_id = 0

        for(j = 0; j < board_size; j++) {

            var cell = document.createElement('div');    

            var id = 'cell_'  + column_id + "_" + row_id;
    
            cell.className = "cell notChecked";
            cell.setAttribute('id', id);
            cell.innerHTML = virtual_board[i][j];
            cell.addEventListener('click', revealCell.bind(this, id), false);  

            board.appendChild(cell);

            row_id++;

        }

        column_id++;

    }
}

// Event executed on clicked cell
function revealCell(cellId) {
    document.getElementById(cellId).className = "cell checked";
}