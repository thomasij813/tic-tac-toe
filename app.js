// important variables to keep track of page state
let currentGame;
let winTally = {
    X: 0,
    O: 0
};
let startingPlayer;

// board rendering function
const renderBoard = (game) => {
    const gameBoard = game.board;
    const flattenedBoard = gameBoard.reduce((accum, row) => {
        return accum.concat(row);
    }, []);

    $('.slot-content').each(function(i) {
        let val = null;

        if (flattenedBoard[i]) {
            val = flattenedBoard[i] === 'X' ? '❌' : '⭕';
        }
        
        $(this).html(val);
    });
}

// game status rendering function
const renderGameStatus = (game) => {
    let message = game.gameStatus.replace('X', '❌').replace('O', '⭕')
    $('.game-status').text(message);
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
    $('.slot').off().on('click', function() {
        console.log('hi')
        const row = $(this).data('row');
        const column = $(this).data('column');
        currentGame.registerTurn(row, column);
    });
};

// get player names and render
promptPlayerNames = () => {
    const xPlayerName = prompt('Who is playing as ❌?');
    const oPlayerName = prompt('Who is playing as ⭕?');

    if (xPlayerName) {
        $('.x-player').text(`${xPlayerName} ❌`);
    }

    if (oPlayerName) {
        $('.o-player').text(`${oPlayerName} ⭕`);
    }
}

// creates a new game, registers callbacks to handle rendering, binds click handlers, and renders
const initializeNewGame = () => {
    if (!startingPlayer) {
        startingPlayer = 'X';
    } else {
        startingPlayer = startingPlayer === 'X' ? 'O' : 'X';
    }

    const gameStyle = $('.game-type-select option:selected');

    if (gameStyle.val() === 'regular') {
        currentGame = new Game(startingPlayer);
    } else {
        currentGame = new RotatingGame(startingPlayer);
    }

    currentGame.registerTurnCallback(renderBoard);
    currentGame.registerTurnCallback(renderGameStatus);
    currentGame.registerTurnCallback(updateWinTally);

    establishMoveClickHandlers();
    renderBoard(currentGame);
    renderGameStatus(currentGame);
}

// get everything rolling
$('.new-game-button').on('click', initializeNewGame);
renderWinTally();
promptPlayerNames();