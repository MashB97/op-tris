# Odin Project Exercise - Tic Tac Toe

## Overview

Hello everyone! This project is an exercise from the [Odin Project](https://www.theodinproject.com/), a simple Tic-Tac-Toe game built using JavaScript, HTML, and CSS. The game allows two players to compete by entering their names, or by playing with the defaults names Player 1 and Player 2, and taking turns to place their marks on a 3x3 grid. The game also includes win and draw conditions, with appropriate messages displayed for each outcome.

## File Structure

- `index.html`: Contains the basic structure and elements for the game interface.
- `styles/style.css`: Stylesheet for the game layout and appearance.
- `scripts/main.js`: Main logic of the game, including player management, game board rendering, and gameplay logic.

## Technologies Used

- **HTML:** For structure and layout.
- **CSS:** For styling the game board and controls.
- **JavaScript:** For game logic, DOM manipulation, and event handling.

## Features

- **Two players gameplay:** Players can enter their names and are assigned the marks X and O.
- **Game board:** A 3x3 grid that updates based on player moves.
- **Win and draw detection:** The game checks for winning combinations and draw conditions after each move.
- **Reset functionality:** Players can reset the game and play again.
- **Interactive user interface:** The game board and control buttons are dynamically rendered and updated.

## Code Overview

### Game Modules

#### 1. `GameBoard`
- Manages the game board state and updates the DOM.
- Methods:
  - `boardRender()`: Renders the current game board.
  - `updateBoard(index, symbol)`: Updates the board with the player's mark.
  - `getIndexGameBoard(index)`: Retrieves the mark at a specific index.
  - `getGameBoard()`: Returns a copy of the game board array.
  - `resetBoard()`: Resets the game board to its initial empty state.

#### 2. `CreatePlayers`
- Manages the creation of players and their data.
- Methods:
  - `create()`: Creates two players based on input names or default values.
  - `getPlayer(index)`: Retrieves a specific player's data.
  - `getAllPlayers()`: Returns all player data.

#### 3. `GamePlay`
- Handles the core gameplay logic, including checking for wins, draws, and player moves.
- Methods:
  - `handleMovePlayer(index)`: Handles player moves, checks for win/draw, and switches players.
  - `checkWin(mark)`: Checks if a player has won the game.
  - `checkDraw()`: Checks if the game is a draw.
  - `resetGame()`: Resets the game state and prepares for a new round.

#### 4. `DomControl`
- Controls the rendering and manipulation of DOM elements for the game.
- Methods:
  - `createGameBoard()`: Creates the game board container.
  - `getPlayerName(playerNumber)`: Retrieves player names from the input fields.
  - `renderGameBoard(gameBoard)`: Renders the game board dynamically.
  - `updateResultMessage(message)`: Updates the result message displayed to players.
  - `toggleControls(show)`: Toggles the visibility of the start and restart buttons.
  - `resetPlayerInputs()`: Resets the player input fields.
  - `removeGameBoard()`: Removes the game board from the DOM.

### Event Listeners

- **Start Button**: 
  - Creates players and renders the game board.
  - Hides the control buttons during gameplay.
  
- **Restart Button**: 
  - Resets the game and player inputs, removes the game board, and restores control buttons.

## How to Play

1. Enter player names in the input fields (or use the default names: "Player 1" and "Player 2").
2. Click the **Start Game** button to begin.
3. Players take turns clicking on an empty square to place their mark (X or O).
4. The game will check for a win or a draw after each move.
5. The result (win or draw) is displayed at the bottom.
6. Click the **Re-start Game** button to reset the game and start over.

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, etc.)

### How to Clone the Repository Locally

1. **Clone the Repository**

   ```bash
   git clone git@github.com:MashB97/op-tris.git

2. **Access the Repository Directory**

    ```bash
    cd op-tris

3. **Open `index.html` in your browser:**
    
    You can simply double-click the `index.html` file, or you can use a local server setup such as `Live Server` in VS Code for a better development experience.

### How to Commit Changes and Update GitHub

1. **Ensure You Are on the Correct Branch**
    
    Ensure You Are on the Correct Branch:

    ```bash
    git branch

2. **If Necessary, Switch Branches**
    
    To switch branches:

    ```bash
    git checkout branch-name
    Note: Replace branch-name with the name of the branch you want to switch to.

### Add Changes to the Next Commit

1. **Add All Modified Files to the Staging Area**

    ```bash
    git add *

2. **For Specific Files**

    ```bash
    git add filename

### Commit Changes

1. **Commit the Changes with a Descriptive Message**

    ```bash
    git commit -m "Description of the changes"

### Push Changes to the Remote Repository

    Send your changes to the repository on GitHub:

    git push origin branch-name

## Future Enhancements

- Add a scoreboard to track wins over multiple rounds.
- Implement AI for a single-player mode.
- Improve mobile responsiveness and design.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests. Contributions are welcome!

Thank you for your interest and contributions! Any suggestions and help are valuable and help me improve continuously.

Enjoy playing! 🎮
