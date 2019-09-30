var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const confirmSequenceWin = (sequence) => {
    let xCount = 0;
    let oCount = 0;

    sequence.forEach(slot => {
        if (slot === 'x') {
            xCount += 1;
        }

        if (slot === 'o') {
            oCount += 1;
        }
    });

    if (xCount === 3) {
        return 'x'
    }

    if (oCount === 3) {
        return 'o'
    }

    return null;
};

const confirmWin = (board) => {
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