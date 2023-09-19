const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

let currentPlayer = 'X';
let playerPoints = 0;
let computerPoints = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    if (!gameBoard.includes('')) {
        return 'T';
    }
    return null;
};

const handleCellClick = (cell) => {
    const cellIndex = cell.id;
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            if (winner === 'T') {
                message.textContent = 'Empate!';
            } else if (winner === 'X') {
                message.textContent = 'Você venceu!';
                message.style.color = 'green';
                playerPoints++;
                playerScore.textContent = playerPoints;
            } else {
                message.textContent = 'O computador venceu!';
                message.style.color = 'blue';
                computerPoints++;
                computerScore.textContent = computerPoints;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && gameActive) {
                setTimeout(computerMove, 500); // Espera meio segundo antes do movimento do computador
            }
        }
    }
};

const computerMove = () => {
    const availableCells = gameBoard.reduce((acc, val, index) => {
        if (val === '') {
            acc.push(index);
        }
        return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const computerChoice = availableCells[randomIndex];
    const cell = cells[computerChoice];
    handleCellClick(cell);
};

const handleReset = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    currentPlayer = 'X';
};

cells.forEach(cell => cell.addEventListener('click', () => handleCellClick(cell)));
resetButton.addEventListener('click', handleReset);
