class Game {
    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
        this.playerTurn = 'X';
        this.gameOver = false;
        this.gameStatus = `Player ${this.playerTurn}'s turn`;
        this.turnCallBacks = [];
    }

    changePlayerTurn() {
        this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X';
    }

    registerTurn(row, column) {
        // if the game is over or the space has already occupied, return immediately
        if (this.gameOver || this.board[row][column]) {
            return this.gameStatus;
        }

        this.board[row][column] = this.playerTurn;

        const boardFull = confirmBoardFull(this.board);
        if (boardFull) {
            this.gameOver = true;
            this.gameStatus = `Tie game!`;
        }

        const potentialWin = confirmWin(this.board);
        if (potentialWin) {
            this.gameOver = true;
            this.gameStatus = `Player ${this.playerTurn} has won!`;
        }

        if (!boardFull && !potentialWin) {
            this.changePlayerTurn();
        }

        this.turnCallBacks.forEach(cb => {
            cb(this);
        })
        
    }

    registerTurnCallback(cb) {
        this.turnCallBacks.push(cb);
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

const confirmBoardFull = (board) => {
    for (let i = 0; i < board.length; i++) {
        let row = board[i];
        if (row.indexOf(null) >= 0) {
            return false;
        }
    }

    return true;
}