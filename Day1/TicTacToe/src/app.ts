const boardElement = document.getElementById("board") as HTMLDivElement;
const statusElement = document.getElementById("status") as HTMLParagraphElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;

let board: string[] = new Array(9).fill("");
let currentPlayer: "X" | "O" = "X";
let gameOver = false;

// Winning combinations
const winningCombos: number[][] = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Create board cells
function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value;
    if (value !== "") cell.classList.add("taken");

    cell.addEventListener("click", () => handleMove(index));
    boardElement.appendChild(cell);
  });
}

// Handle player move
function handleMove(index: number) {
  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  if (checkWinner()) {
    statusElement.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameOver = true;
  } else if (board.every(cell => cell !== "")) {
    statusElement.textContent = "It's a draw! 😐";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
  renderBoard();
}

// Check winner
function checkWinner(): boolean {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === currentPlayer)
  );
}

// Reset game
resetButton.addEventListener("click", () => {
  board = new Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  statusElement.textContent = "Player X's turn";
  renderBoard();
});

// Initial render
renderBoard();
