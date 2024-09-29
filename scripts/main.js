// Module to manage the state and functionality of the game board.
// Encapsulates the game board as an array and provides methods to interact with it.
const GameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    // Renders the current state of the game board to the DOM.
    const boardRender = () => {
        DomControl.renderGameBoard(gameBoard);
    };
    // Updates the game board at the given index with the specified symbol, then re-renders the board.
    const updateBoard = (index, symbol) => {
        gameBoard[index] = symbol;
        boardRender();
    };
    // Returns the symbol at the specified index on the game board.
    const getIndexGameBoard = (index) => {
        return gameBoard[index];
    };
    // Returns a copy of the current game board array.
    const getGameBoard = () => {
        return [...gameBoard];
    };
    // Resets the game board to its initial empty state and re-renders it.
    const resetBoard = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        boardRender();
    };
    // Public API for interacting with the game board.
    return { boardRender, updateBoard, getIndexGameBoard, resetBoard, getGameBoard };
})();
// Module to manage the creation and data of the players.
// Provides methods to create players, access a specific player, and get a list of all players.
const CreatePlayers = (() => {
    let gamePlayers = [];
    // Creates two players using names from the DOM or default names, and assigns their marks.
    const create = () => {
        const playerOneName = DomControl.getPlayerName(1) || 'Player 1 ';
        const playerTwoName = DomControl.getPlayerName(2) || 'Player 2 ';
        gamePlayers = [
            { name: playerOneName, mark: 'X' },
            { name: playerTwoName, mark: 'O' }
        ];
    };
    // Returns the player object at the specified index.
    const getPlayer = (index) => {
        return gamePlayers[index];
    };
    // Returns a copy of the array containing both players.
    const getAllPlayers = () => {
        return [...gamePlayers];
    };
    // Public API for creating and retrieving player data.
    return { create, getPlayer, getAllPlayers };
})();
// Module to handle the gameplay logic, including player moves, win/draw conditions, and game resets.
// Manages the flow by tracking the current player, checking for wins or draws, and resetting the game state.
const GamePlay = (() => {
     // Tracks which player is currently playing (0 for Player 1, 1 for Player 2).
    let currentPlayerIndex = 0;
    // Flag to indicate if the game has ended.
    let gameEnded = false; 
    // Handles a player's move, updates the game board, and checks for win or draw conditions.
    const handleMovePlayer = (index) => {
        const players = CreatePlayers.getAllPlayers();
        const currentPlayer = players[currentPlayerIndex];
        // Only allow the move if the selected spot is empty and the game hasn't ended.
        if (GameBoard.getIndexGameBoard(index) === '' && !gameEnded) {
            GameBoard.updateBoard(index, currentPlayer.mark);
            // Check if the current player has won the game.
            if (checkWin(currentPlayer.mark)) {
                DomControl.updateResultMessage(`${currentPlayer.name} win`);
                // Hide controls after a win.
                DomControl.toggleControls(false);
                // Set flag to indicate game over.
                gameEnded = true; 
            } 
            // Check for a draw condition.
            else if (checkDraw()) {
                DomControl.updateResultMessage('draw');
                gameEnded = true;
            } 
            // Switch to the other player if the game continues.
            else {
                currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            }
        } else {
            // Ignore invalid moves.
            return;
        }
    };
    // Checks if the current player has a winning combination on the board.
    const checkWin = (mark) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];
        return winningCombinations.some(combination =>
            combination.every(index => GameBoard.getIndexGameBoard(index) === mark)
        );
    };
    // Checks if all spots on the game board are filled without a winner.
    const checkDraw = () => {
        return GameBoard.getGameBoard().every(square => square !== '');
    };
    // Resets the game state, clears the board, and prepares for a new game.
    const resetGame = () => {
        GameBoard.resetBoard();
        gameEnded = false;
        currentPlayerIndex = 0;
        DomControl.updateResultMessage('');
    };
    // Public API for handling player moves and resetting the game.
    return { handleMovePlayer, resetGame };
})();
// Module responsible for controlling the DOM elements and user interface of the game.
// It handles the creation, rendering, and manipulation of the game board and user controls.
const DomControl = (() => {
    // Querying necessary DOM elements for later manipulation.
    const bodyContainer = document.querySelector('body');
    const resultContainer = document.querySelector('.result-container');
    const controlsContainer = document.querySelector('.controls-container');
    const btnStart = document.querySelector('.start-btn');
    const btnReStart = document.querySelector('.restart-btn');
    const resultMsg = document.querySelector('.result');
    let gameBoardContainer;
    // Creates the game board container if it doesn't already exist.
    const createGameBoard = () => {
        if (!document.querySelector('.gameboard-container')) {
            gameBoardContainer = document.createElement('div');
            gameBoardContainer.classList.add('gameboard-container');
            bodyContainer.insertBefore(gameBoardContainer, resultContainer);
        }
    };
    // Retrieves the player's name input from the DOM by player number.
    const getPlayerName = (playerNumber) => {
        return document.querySelector(`#player${playerNumber}`).value;
    };
    // Renders the game board on the screen, creating clickable squares based on the game board's state.
    const renderGameBoard = (gameBoard) => {
        if (gameBoardContainer) {
            // Clear previous content.
            gameBoardContainer.innerHTML = '';
            gameBoard.forEach((symbolGame, index) => {
                let squareBoard = document.createElement('div');
                squareBoard.classList.add('square-board');
                // Set the symbol ('X', 'O', or empty).
                squareBoard.textContent = `${symbolGame}`; 
                squareBoard.setAttribute('id', `square-board-${index}`);
                // Attach click event for move handling.
                squareBoard.addEventListener('click', () => GamePlay.handleMovePlayer(index)); 
                gameBoardContainer.appendChild(squareBoard);
            });
        }
    };
    // Updates the result message displayed to the player.
    const updateResultMessage = (message) => {
        resultMsg.textContent = message;
    };
    // Toggles the visibility of the control buttons (start and restart).
    const toggleControls = (show) => {
        controlsContainer.classList.toggle('hidden', !show);
        btnStart.classList.toggle('hidden', !show);
    };
    // Resets the player input fields for new names.
    const resetPlayerInputs = () => {
        document.querySelector('#player1').value = '';
        document.querySelector('#player2').value = '';
    };
    // Removes the game board container from the DOM.
    const removeGameBoard = () => {
        if (gameBoardContainer) {
            gameBoardContainer.remove();
            gameBoardContainer = null;
        }
    };
    // Public API for managing the DOM, including buttons and the game board display.
    return {
        createGameBoard,
        getPlayerName,
        renderGameBoard,
        updateResultMessage,
        toggleControls,
        resetPlayerInputs,
        removeGameBoard,
        btnStart,
        btnReStart,
    };
})();
// Event listeners for the Start and Restart buttons:
//  - Start button click event:
DomControl.btnStart.addEventListener('click', () => {
    // Creates players if the game board doesn't already exist.
    if (!document.querySelector('.gameboard-container')) {
        // Create the players.
        CreatePlayers.create();
        // Create the game board.              
        DomControl.createGameBoard();
        // Hide control buttons (start/restart).        
        DomControl.toggleControls(false);
        // Render the game board.    
        GameBoard.boardRender();             
    }
});

//  - Restart button click event
DomControl.btnReStart.addEventListener('click', () => {
    // Reset the game state.
    GamePlay.resetGame();
    // Clear player name inputs.                    
    DomControl.resetPlayerInputs();
    // Remove the game board from the DOM.           
    DomControl.removeGameBoard();
    // Show the start controls again.             
    DomControl.toggleControls(true);          
});


