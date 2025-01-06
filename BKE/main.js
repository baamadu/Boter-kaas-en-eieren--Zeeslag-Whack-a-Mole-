console.log("Main loaded");

let playerName = localStorage.getItem("playerName");

// Array van ongeldige woorden (bijvoorbeeld scheldwoorden)
const invalidWords = ["kanker", "fuck", "mongool", "shit"]; // Vervang deze met echte scheldwoorden

// Functie voor het vragen en valideren van de naam
function askForPlayerName() {
  playerName = prompt("Wat is je naam?");
  
  if (playerName) {
    
    playerName = playerName.replace(/[^a-zA-Z\s]/g, '');
    
    // Controleer op ongeldige woorden
    const containsInvalidWord = invalidWords.some(word => playerName.toLowerCase().includes(word.toLowerCase()));
    
    if (containsInvalidWord) {
      alert("De naam bevat ongeldige woorden. Kies een andere naam.");
      playerName = ""; 
      askForPlayerName(); 
    } else if (playerName.trim() === "") {
      alert("ongeldige naam.");
      askForPlayerName(); 
    } else {
      localStorage.setItem("playerName", playerName);
      alert("Welkom, " + playerName + "!");
    }
  } else {
    alert("Je hebt geen naam ingevuld");
    askForPlayerName(); 
  }
}

// Vraag de naam van de speler als deze nog niet is opgeslagen
if (!playerName) {
  askForPlayerName();
} else {
  alert("Welkom terug, " + playerName + "!");
}

const vakjes = document.querySelectorAll(".vakje");
console.log(vakjes);

let currentPlayer = "X"; // Speler X begint

let playerScore = localStorage.getItem("playerScore")
  ? parseInt(localStorage.getItem("playerScore"))
  : 0;
let computerScore = localStorage.getItem("computerScore")
  ? parseInt(localStorage.getItem("computerScore"))
  : 0;

const playerNameElement = document.querySelector("#player-name");
const playerScoreElement = document.querySelector("#score-value");
const computerScoreElement = document.querySelector("#computer-score-value");
const messageBox = document.querySelector(".messageBox");

updateScoreDisplay();

document.querySelector(".start-button").addEventListener("click", startGame);
document.querySelector(".restart-button").addEventListener("click", resetGame);

function startGame() {
  resetBoard();
  messageBox.textContent = "Speler X begint!";
  currentPlayer = "X"; 
}

function resetGame() {
  // Vraag opnieuw om de naam wanneer de game wordt herstart
  askForPlayerName(); // Eerst naam vragen
  
  // Vervolgens reset het bord en de score
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
      if (checkDraw()) {
        showMessage("Het is een gelijkspel!");
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
  } else if (checkDraw()) {
    showMessage("Het is een gelijkspel!");
    resetBoard();
  } else {
    currentPlayer = "X"; // Wissel terug naar de speler
  }
}

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

function checkDraw() {
  // Check if all cells are filled and there's no winner
  return [...vakjes].every(vakje => vakje.textContent !== "") && !checkWinner("X") && !checkWinner("O");
}

function showMessage(message) {
  messageBox.textContent = message;
  messageBox.style.display = "block";
}

function saveScores() {
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
}

function updateScoreDisplay() {
  playerNameElement.textContent = playerName;  // Toon de naam van de speler
  playerScoreElement.textContent = playerScore; // Toon de score van de speler
  computerScoreElement.textContent = computerScore; // Toon de score van de computer
}

