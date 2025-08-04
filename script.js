let player1 = "", player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;

const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();
  if (!player1 || !player2) {
    alert("Please enter both player names.");
    return;
  }

  currentPlayer = player1;
  currentSymbol = "X";
  document.getElementById("player-form").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  updateMessage(`${currentPlayer}, you're up`);
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent) return;

    cell.textContent = currentSymbol;
    cell.style.pointerEvents = "none";

    if (checkWinner()) {
      updateMessage(`${currentPlayer}, congratulations you won!`);
      gameActive = false;
    } else if ([...cells].every(c => c.textContent !== "")) {
      updateMessage("It's a draw!");
      gameActive = false;
    } else {
      switchPlayer();
    }
  });
});

function switchPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "O";
  } else {
    currentPlayer = player1;
    currentSymbol = "X";
  }
  updateMessage(`${currentPlayer}, you're up`);
}

function updateMessage(msg) {
  document.querySelector(".message").textContent = msg;
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    const cellA = document.getElementById(a.toString());
    const cellB = document.getElementById(b.toString());
    const cellC = document.getElementById(c.toString());

    if (
      cellA.textContent &&
      cellA.textContent === cellB.textContent &&
      cellA.textContent === cellC.textContent
    ) {
      cellA.classList.add("winner");
      cellB.classList.add("winner");
      cellC.classList.add("winner");
      return true;
    }
  }
  return false;
}
