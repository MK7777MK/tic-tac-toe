let cells = document.querySelectorAll("[data-cell]");
let board = document.getElementById("board");
let message = document.querySelector("[message]");
let winningMessage = document.getElementById("winningMessage");
let restart = document.getElementById("restart");
let win = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
let x = "x";
let o = "o";
let turn;

startGame();

restart.addEventListener("click", startGame);

function startGame() {
	turn = false;
	cells.forEach(cell => {
        cell.classList.remove(x);
        cell.classList.remove(o);
        cell.removeEventListener("click", clickIT);
		cell.addEventListener("click", clickIT, { once: true });
	});
    setBoard();
    winningMessage.classList.remove("show");
}

function clickIT(e) {
	let cell = e.target;
	let currentClass = turn ? o : x;

	placeMark(cell, currentClass);
	if (isWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	}
	swapTurns();
	setBoard();
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}
function swapTurns() {
	turn = !turn;
}
function setBoard() {
	board.classList.remove(x);
	board.classList.remove(o);
	turn ? board.classList.add(o) : board.classList.add(x);
}
function isWin(currentClass) {
	return win.some(winning => {
		return winning.every(index => {
			return cells[index].classList.contains(currentClass);
		});
	});
}
function isDraw() {
	return [...cells].every(cell => {
		return cell.classList.contains(x) || cell.classList.contains(o);
	});
}
function endGame(draw) {
	draw
		? (message.innerHTML = "Draw!!!")
		: (message.innerHTML = `${turn ? "O" : "X"} Wins!!!`);
	winningMessage.classList.add("show");
}
