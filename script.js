// Declare constant values
const board_size = 10;
const cell_size = 80 / board_size;
const minesCount = 15

// Search for elements
const board = document.getElementById("game_board");

// Declare variables
var virtual_board = [];


// Exxecute functions
addEventListener("load", onInit);

// Execute on page initialization
function onInit () {

    // Set grid template dynamically
    board.style.gridTemplateColumns = "repeat(" + board_size + ", " + cell_size + "vmin)";
    board.style.gridTemplateRows = "repeat(" + board_size + ", " + cell_size + "vmin)";

    // Declare variables
    var virtual_board_in = [];
    var column_id = 0;
    var row_id;

    // Create all cells and array
    for(i = 0; i < board_size; i++) {

        row_id = 0

        for(j = 0; j < board_size; j++) {

            var cell = document.createElement('div');    

            var id = 'cell_'  + column_id + "_" + row_id;
    
            cell.className = "cell";
            cell.setAttribute('id', id);

            board.appendChild(cell);
            virtual_board_in.push(0);

            row_id++;

        }

        virtual_board.push(virtual_board_in);
        virtual_board_in = [];

        column_id++;

    }

    for(i = 0; i < board_size; i++) {
        for(j = 0; j < board_size; j++) {
            virtual_board[i][j] = countMines(i, j);
        }
    }

    assignMinesOnBoard(minesCount);


    console.log(virtual_board);
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

function countMines(x, y) {

    var minesInSurroundings = 0;

    for(a = x - 1; a <= x + 1; a++) {
        if(a < 0 || a > board_size) { continue; }
        for(b = y - 1; b <= b + 1; b++) {
            if(b < 0 || b > board_size) { continue; }
            if(virtual_board[a][b] != -1) { continue; }

            console.log(minesInSurroundings);
            minesInSurroundings++;
        }
        
    }

    return minesInSurroundings;
}
