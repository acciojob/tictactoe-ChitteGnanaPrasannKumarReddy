//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    let player1 = document.getElementById('player-1').value;
    let player2 = document.getElementById('player-2').value;

    if (player1 && player2) {
        document.getElementById('input-form').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        startGame(player1, player2);
    }
});

function startGame(player1, player2) {
    let board = document.getElementById('board');
    let message = document.querySelector('.message');
    let cells = [];
    let currentPlayer = player1;
    let currentSymbol = 'X';

    board.innerHTML = "";
    message.textContent = `${currentPlayer}, you're up!`;

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
        cells.push(cell);

        cell.addEventListener('click', function() {
            if (!cell.textContent) {
                cell.textContent = currentSymbol;
                if (checkWin(cells)) {
                    message.textContent = `${currentPlayer}, congratulations you won!`;
                    highlightWinningCells(cells);
                    cells.forEach(c => c.style.pointerEvents = 'none');
                } else if (cells.every(c => c.textContent !== "")) {
                    message.textContent = "It's a draw!";
                } else {
                    currentPlayer = (currentPlayer === player1) ? player2 : player1;
                    currentSymbol = (currentSymbol === 'X') ? 'O' : 'X';
                    message.textContent = `${currentPlayer}, you're up!`;
                }
            }
        });
    }
}

function checkWin(cells) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.find(combination => {
        let [a, b, c] = combination;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

function highlightWinningCells(cells) {
    const winningCombo = checkWin(cells);
    if (winningCombo) {
        winningCombo.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    }
}
