const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const winningmessageElement = document.getElementById("winningMessage");
const winningmessagetextElement = document.querySelector(
  "[data-winning-message-text]"
);
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restart = document.getElementById("restartButton");
const Winning_Combination = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6]
];

let circleturn;
startGame();

restart.addEventListener("click", startGame);

function startGame() {
  circleturn = true;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleclicked);
    cell.addEventListener("click", handleclicked, { once: true });
  });
  setBoardHoverClass();
  winningmessageElement.classList.remove("show");
}

function handleclicked(e) {
  const cell = e.target;
  const currentclass = circleturn ? CIRCLE_CLASS : X_CLASS;
  placemark(cell, currentclass);
  if (checkwin(currentclass)) {
    endgame(false);
  } else if (isdraw()) {
    endgame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endgame(draw) {
  if (draw) {
    winningmessagetextElement.innerText = "!Draw";
  } else {
    winningmessagetextElement.innerText = `${circleturn ? "O's" : "X's"} Wins!`;
  }
  winningmessageElement.classList.add("show");
}

function placemark(cell, currentclass) {
  cell.classList.add(currentclass);
}

function swapTurns() {
  circleturn = !circleturn;
}

function isdraw() {
  return [...cellElements].every(cell => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
function setBoardHoverClass() {
  board.classList.remove(CIRCLE_CLASS);
  board.classList.remove(X_CLASS);
  if (circleturn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkwin(currentclass) {
  return Winning_Combination.some(combinantion => {
    return combinantion.every(index => {
      return cellElements[index].classList.contains(currentclass);
    });
  });
}
