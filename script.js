//your JS code here. If required.
let player1Name, player2Name;
let currentPlayer = 1;
let gameOver = false;

document.getElementById('submit').addEventListener('click', () => {
    player1Name = document.getElementById('player-1').value;
    player2Name = document.getElementById('player-2').value;
    document.getElementById('player-names').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    updateMessage();
});

function updateMessage() {
    let message = document.querySelector('.message');
    if (gameOver) {
        return;
    }
    if (currentPlayer === 1) {
        message.innerText = `${player1Name}, you're up!`;
    } else {
        message.innerText = `${player2Name}, you're up!`;
    }
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameOver) {
            return;
        }
        if (cell.innerText !== '') {
            return;
        }
        if (currentPlayer === 1) {
            cell.innerText = 'X';
            currentPlayer = 2;
        } else {
            cell.innerText = 'O';
            currentPlayer = 1;
        }
        checkWinner();
        updateMessage();
    });
});

function checkWinner() {
    let cells = document.querySelectorAll('.cell');
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let combination of winningCombinations) {
        if (cells[combination[0]].innerText === cells[combination[1]].innerText &&
            cells[combination[1]].innerText === cells[combination[2]].innerText &&
            cells[combination[0]].innerText !== '') {
            let winner = cells[combination[0]].innerText === 'X' ? player1Name : player2Name;
            document.querySelector('.message').innerText = `${winner} congratulations you won!`;
            gameOver = true;
        }
    }
}
