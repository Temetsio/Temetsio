const Ristinolla = {
    cPlayer: "X",// tracks current player (X or O)
    state: Array(9).fill(null), // Board state (null for empty cells)
    gameOver: false, // Indicates if game is over

    // Initialize game
    Initialize() {
        this.cBoard();
        document
        .getElementById("reset")
        .addEventListener("click",()=> this.reset())

},

// create the game board dynamically
cBoard () {
    const board = document.getElementById("Board");
    board.innerHTML = "", // clear previous board
    this.state.forEach((_, i) => {
        const cell = document.createElement ("div");
        cell.classList.add ("cell");
        cell.dataset.index = i;
        board.appendChild(cell);
    });
    board.addEventListener("click", (e) => this.handleClick(e)); // handle clicks on the board
    this.uMessage(`Pelaajan ${this.cPlayer} vuoro`);
},

// handle a cell click
handleClick (e) {
    const cell = e.target;
    const i = cell.dateset.index

    // ignore clicks if game is over or cell is taken
    if (this.gameOver  || !cell.classList.contains("cell") || this.state[i]) 
    return;

    // update board state and  UI
    this.state[i] = this.cPlayer;
    cell.textContent = this.cPlayer;
    cell.classList.add("taken");

    // check for winner or a tie
    const winCombo = this.checkWin();
    if (winCombo) {
        this.highlight(winCombo);
        this.uMessage(`Pelaaja ${this.cPlayer} voitti! Onnittelut!`);
        this.gameOver = true;
    } else if (this.state.every((cell) => cell)) {
        this.uMessage("Tasapeli");
        this.gameOver = true;
    } else {
        // switch players
        this.cPlayer = this.cPlayer === "X" ? "O": "X";
        this.uMessage(`Pelaaja ${this.cPlayer}:n vuoro`);
    }
},

// check if there's a winning combination
checkWin () {
    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8], // rows
        [0,3,6],
        [1,4,7],
        [2,5,8], // columns
        [0,4,8],
        [2,4,6], // diagonals
    ];
    return wins.find((combo) =>
    combo.every((i) => this.state[i] === this.cPlayer)
    );
},

// highlight winning cells
highlight(combo) {
    combo.forEach((i) => {
        document.getElementById("board").children[i].style.color = "red";
    });
},

// reset the game
reset() {
    this.state = Array(9).fill(null);
    this.cPlayer = "X";
    this.gameOver = false;
    this.cBoard();
},

// update the game status message
uMessage(msg) {
    document.getElementById("message").textContent = msg;
},
};

// start the game
Ristinolla.Initialize();
