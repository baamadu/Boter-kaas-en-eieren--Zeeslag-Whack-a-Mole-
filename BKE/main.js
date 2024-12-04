console.log("Main loaded");


const vakjes = document.querySelectorAll(".vakje");
console.log(vakjes);

let currentPlayer = "X"; // Speler X begint


let playerScore = localStorage.getItem("playerScore")
  ? parseInt(localStorage.getItem("playerScore"))
  : 0;
let computerScore = localStorage.getItem("computerScore")
  ? parseInt(localStorage.getItem("computerScore"))
  : 0;


const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");
const messageBox = document.querySelector(".messageBox"); 

// Toon de score op basis van localStorage
updateScoreDisplay();


document.querySelector(".start-button").addEventListener("click", startGame);
document.querySelector(".restart-button").addEventListener("click", resetGame);


function startGame() {
  resetBoard();
  messageBox.textContent = "Speler X begint!";
  currentPlayer = "X"; 
}


function resetGame() {
  resetBoard();
  playerScore = 0;
  computerScore = 0;
  updateScoreDisplay();
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
  messageBox.textContent = "";
}


function resetBoard() {
  for (let i = 0; i < vakjes.length; i++) {
    vakjes[i].textContent = "";
  }
}


for (let i = 0; i < vakjes.length; i++) {
  vakjes[i].addEventListener("click", function () {
    if (vakjes[i].textContent === "" && currentPlayer === "X") {
      vakjes[i].textContent = "X"; 
      if (checkWinner("X")) {
        showMessage("Speler X heeft gewonnen!");
        playerScore++;
        saveScores();
        updateScoreDisplay();
        resetBoard();
        return;
      }
      currentPlayer = "O"; 
      setTimeout(computerMove, 500); 
    }
  });
}

function computerMove() {
  const legeVakjes = [];
  for (let i = 0; i < vakjes.length; i++) {
    if (vakjes[i].textContent === "") {
      legeVakjes.push(i); 
    }
  }
  const randomMove = legeVakjes[Math.floor(Math.random() * legeVakjes.length)];
  vakjes[randomMove].textContent = "O"; 
  if (checkWinner("O")) {
    showMessage("Computer heeft gewonnen!");
    computerScore++;
    saveScores();
    updateScoreDisplay();
    resetBoard();
  } else {
    currentPlayer = "X"; // Wissel terug naar de speler
  }
}

// Controleer of er een winnaar is
function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2], // Rij 1
    [3, 4, 5], // Rij 2
    [6, 7, 8], // Rij 3
    [0, 3, 6], // Kolom 1
    [1, 4, 7], // Kolom 2
    [2, 5, 8], // Kolom 3
    [0, 4, 8], // Diagonaal 1
    [2, 4, 6], // Diagonaal 2
  ];

  return winningCombinations.some(function (combo) {
    return combo.every(function (i) {
      return vakjes[i].textContent === player;
    });
  });
}


function showMessage(message) {
  messageBox.textContent = message;
  messageBox.style.display = "block";
}

// Sla de scores op in localStorage
function saveScores() {
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
}


function updateScoreDisplay() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}
