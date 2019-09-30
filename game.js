class Game {
    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
        this.playerTurn = 'X';
        this.gameOver = false;
        this.gameStatus = `Player X's turn`;
        this.turnCallBacks = [];
    }

    changePlayerTurn() {
        this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X';
    }

    // add a callback to the list of callbacks to be executed after each turn
    registerTurnCallback(cb) {
        this.turnCallBacks.push(cb);
    }

    registerTurn(row, column) {
        // if the game is over or the space has already occupied, return immediately
        if (this.gameOver || this.board[row][column]) {
            return this.gameStatus;
        }

        // update the slot that was selected to reflect the current player
        this.board[row][column] = this.playerTurn;

        // check if the board is full, and update accordingly
        const boardFull = confirmBoardFull(this.board);
        if (boardFull) {
            this.gameOver = true;
            this.gameStatus = 'Tie game!';
        }

        // check if there is a potential win, and update accordingly
        const potentialWin = confirmWin(this.board);
        if (potentialWin) {
            this.gameOver = true;
            this.gameStatus = `Player ${this.playerTurn} has won!`;
        }

        // if neither teh board is full nor their is a winner, advance the player turn
        if (!boardFull && !potentialWin) {
            this.changePlayerTurn();
            this.gameStatus = `Player ${this.playerTurn}'s turn`;
        }

        // execute all registered callbacks, passing in the current game as the argument
        this.turnCallBacks.forEach(cb => {
            cb(this);
        });
    }
}


const confirmWin = (board) => {
    // Helper function for determing if a sequnece of three markers is a win. 
    const confirmSequenceWin = (sequence) => {
        let xCount = 0;
        let oCount = 0;
    
        sequence.forEach(slot => {
            if (slot === 'X') {
                xCount += 1;
            }
    
            if (slot === 'O') {
                oCount += 1;
            }
        });
    
        if (xCount === 3) {
            return 'X'
        }
    
        if (oCount === 3) {
            return 'O'
        }
    
        return null;
    };

    //test rows
    for (let i = 0; i < 3; i++) {
        let row = board[i];
        let potentialWin = confirmSequenceWin(row);
        if (potentialWin) {
            return potentialWin;
        }
    }

    //test columns
    for (let i = 0; i < 3; i++) {
        let column = board.map((row) => row[i])
        let potentialWin = confirmSequenceWin(column);
        if (potentialWin) {
            return potentialWin;
        }
    }

    //test diagonals
    const leftDiagonal = [board[0][0], board[1][1], board[2][2]];
    let potentialLeftDiagonalWin = confirmSequenceWin(leftDiagonal);
    if (potentialLeftDiagonalWin) {
        return potentialLeftDiagonalWin;
    }

    const rightDiagonal = [board[0][2], board[1][1], board[2][0]];
    let potentialRightDiagonalWin = confirmSequenceWin(rightDiagonal);
    if (potentialRightDiagonalWin) {
        return potentialRightDiagonalWin;
    }

    return null;
}

// helper funtion to determine if a board is full
const confirmBoardFull = (board) => {
    for (let i = 0; i < board.length; i++) {
        let row = board[i];
        if (row.indexOf(null) >= 0) {
            return false;
        }
    }

    return true;
}