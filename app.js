let currentGame;

const renderBoard = (game) => {
    const gameBoard = game.board;
    const flattenedBoard = gameBoard.reduce((accum, row) => {
        return accum.concat(row)
    }, []);

    $('.board span').each(function(i) {
        let val = flattenedBoard[i] ? flattenedBoard[i] : '_';
        $(this).html(val);
    })
}

const renderGameStatus = (game) => {
    $('.game-status').text(game.gameStatus);
}

const establishMoveClickHandlers = () => {
    $('.board span').on('click', function() {
        const row = $(this).data('row');
        const column = $(this).data('column');
        currentGame.registerTurn(row, column);
    });
}

const initializeNewGame = () => {
    currentGame = new Game();

    currentGame.registerTurnCallback(renderBoard);
    currentGame.registerTurnCallback(renderGameStatus);

    establishMoveClickHandlers();
    renderBoard(currentGame);
    renderGameStatus(currentGame);
}

$('.new-game-button').on('click', initializeNewGame);