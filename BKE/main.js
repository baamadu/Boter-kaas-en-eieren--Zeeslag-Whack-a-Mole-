console.log("Main loaded");

let playerName = localStorage.getItem("playerName");

// Array van ongeldige woorden (bijvoorbeeld scheldwoorden)
const invalidWords = [
  "lul", "klootzak", "kanker", "eikel", "kak", "domkop", "asociale", "loser",
  "debiel", "tut", "sukkel", "gek", "stomkop", "flikker", "prutser"];

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
      alert("Ongeldige naam.");
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

// Haal de score op uit localStorage of stel in op 0 als deze niet bestaat
let playerScore = localStorage.getItem("playerScore")
  ? parseInt(localStorage.getItem("playerScore"))
  : 0;
let computerScore = localStorage.getItem("computerScore")
  ? parseInt(localStorage.getItem("computerScore"))
  : 0;

// Haal de elementen op waar de naam en score van de speler en computer worden weergegeven
const playerNameElement = document.querySelector("#player-name");
const playerScoreElement = document.querySelector("#score-value");
const computerScoreElement = document.querySelector("#computer-score-value");
const messageBox = document.querySelector(".messageBox");

// Update de score weer te geven op basis van de opgeslagen gegevens
updateScoreDisplay();

// Eventlisteners voor de start- en reset-knoppen
document.querySelector(".start-button").addEventListener("click", startGame);
document.querySelector(".restart-button").addEventListener("click", resetGame);


// Start het spel door het bord te resetten en de speler X te laten beginnen.
function startGame() {
  resetBoard();
  messageBox.textContent = "Speler X begint!";
  currentPlayer = "X";
}


// Reset het spelbord, score en vraag opnieuw om de naam wanneer het spel wordt herstart.
function resetGame() {
  askForPlayerName();

  // Vervolgens reset het bord en de score
  resetBoard();
  playerScore = 0;
  computerScore = 0;
  updateScoreDisplay();
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
  messageBox.textContent = "";
}

 
 // Reset het bord door de inhoud van alle vakjes leeg te maken.
 function resetBoard() {
  for (let i = 0; i < vakjes.length; i++) {
    vakjes[i].textContent = "";
  }
}


  //Zet een X in een vakje als het leeg is en de beurt van de speler is. Controleer daarna of er een winnaar of gelijkspel is.
for (let i = 0; i < vakjes.length; i++) {
  vakjes[i].addEventListener("click", function () {
    if (vakjes[i].textContent === "" && currentPlayer === "X") {
      vakjes[i].textContent = "X";

      // Controleer of de speler X heeft gewonnen
      if (checkWinner("X")) {
        showMessage("Speler X heeft gewonnen!");
        playerScore++;
        saveScores();
        updateScoreDisplay();

        // Als de speler 5 punten heeft, eindig het spel
        if (playerScore === 5) {
          showMessage("Speler X heeft het spel gewonnen!");
          resetGame();
        } else {
          resetBoard();
        }
        return;
      }

      // Controleer of het een gelijkspel is
      if (checkDraw()) {
        showMessage("Het is een gelijkspel!");
        resetBoard();
        return;
      }

      // Wissel naar de beurt van de computer
      currentPlayer = "O";
      setTimeout(computerMove, 500);
    }
  });
}


//Laat de computer een zet doen door een willekeurig leeg vakje in te vullen. Controleer daarna of de computer heeft gewonnen of of er een gelijkspel is.
function computerMove() {
  const legeVakjes = [];

  // Zoek naar alle lege vakjes
  for (let i = 0; i < vakjes.length; i++) {
    if (vakjes[i].textContent === "") {
      legeVakjes.push(i);
    }
  }

  // Kies een willekeurig leeg vakje en zet een O
  const randomMove = legeVakjes[Math.floor(Math.random() * legeVakjes.length)];
  vakjes[randomMove].textContent = "O";

  // Controleer of de computer gewonnen heeft
  if (checkWinner("O")) {
    showMessage("Computer heeft gewonnen!");
    computerScore++;
    saveScores();
    updateScoreDisplay();

    // Als de computer 5 punten heeft, eindig het spel
    if (computerScore === 5) {
      showMessage("De computer heeft het spel gewonnen!");
      resetGame();
    } else {
      resetBoard();
    }
  } else if (checkDraw()) {
    showMessage("Het is een gelijkspel!");
    resetBoard();
  } else {
    currentPlayer = "X"; // Wissel terug naar de speler
  }
}


// Controleer of de opgegeven speler heeft gewonnen op basis van de winnende combinaties.
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


// Controleer of het bord vol is en er geen winnaar is, dus het is een gelijkspel.
function checkDraw() {
  return [...vakjes].every(vakje => vakje.textContent !== "") && !checkWinner("X") && !checkWinner("O");
}


// Toon een bericht in het messagebox-element.
function showMessage(message) {
  messageBox.textContent = message;
  messageBox.style.display = "block";
}


// Sla de huidige score van de speler en de computer op in localStorage.
function saveScores() {
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
}


// Update de scoreweergave op de pagina.
function updateScoreDisplay() {
  playerNameElement.textContent = playerName;  // Toon de naam van de speler
  playerScoreElement.textContent = playerScore; // Toon de score van de speler
  computerScoreElement.textContent = computerScore; // Toon de score van de computer
}







