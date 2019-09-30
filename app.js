// important variables to keep track of page state
let currentGame;
let winTally = {
    X: 0,
    O: 0
};

// board rendering function
const renderBoard = (game) => {
    const gameBoard = game.board;
    const flattenedBoard = gameBoard.reduce((accum, row) => {
        return accum.concat(row);
    }, []);

    $('.board span').each(function(i) {
        let val = flattenedBoard[i] ? flattenedBoard[i] : '_';
        $(this).html(val);
    });
}

// game status rendering function
const renderGameStatus = (game) => {
    $('.game-status').text(game.gameStatus);
};

// win tally rendering function
const renderWinTally = () => {
    $('.x-wins').text(winTally.X);
    $('.o-wins').text(winTally.O);
};

// looks at game, determines if there is a win, updates the win tally, and then re-renders
const updateWinTally = (game) => {
    if (game.gameOver && game.gameStatus !== 'Tie game!') {
        winTally[game.playerTurn] += 1;
        renderWinTally();
    }
};

// binds click handlers between the current game and the slots rendered on the dom
const establishMoveClickHandlers = () => {
    $('.board span').on('click', function() {
        const row = $(this).data('row');
        const column = $(this).data('column');
        currentGame.registerTurn(row, column);
    });
};

// creates a new game, registers callbacks to handle rendering, binds click handlers, and renders
const initializeNewGame = () => {
    currentGame = new Game();

    currentGame.registerTurnCallback(renderBoard);
    currentGame.registerTurnCallback(renderGameStatus);
    currentGame.registerTurnCallback(updateWinTally);

    establishMoveClickHandlers();
    renderBoard(currentGame);
    renderGameStatus(currentGame);
}

// get player names and render
promptPlayerNames = () => {
    const xPlayerName = prompt('Who is playing as X?');
    const oPlayerName = prompt('Who is playing as O?');

    if (xPlayerName) {
        $('.x-player').text(`${xPlayerName} (X)`);
    }

    if (oPlayerName) {
        $('.o-player').text(`${oPlayerName} (O)`);
    }
}

// get everything rolling
$('.new-game-button').on('click', initializeNewGame);
renderWinTally();
promptPlayerNames();