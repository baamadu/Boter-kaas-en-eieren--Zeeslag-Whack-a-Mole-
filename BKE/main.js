console.log("Main loaded");

// Haal alle vakken op met querySelectorAll
const vakjes = document.querySelectorAll(".vakje");
console.log(vakjes);

const xVakjes = [];
const oVakjes = [];
let currentPlayer = "X"; // Voeg `let` toe om variabele te declareren

const messageBox = document.querySelector(".messageBox"); // Punt toegevoegd om de class te selecteren


for (let i = 0; i < vakjes.length; i++) {
  const vakje = vakjes[i];
  vakje.addEventListener("click", function () {
    if (vakje.textContent === "") {
      vakje.textContent = currentPlayer;
      if (currentPlayer === "X") {
        xVakjes.push(i);
      } else {
        oVakjes.push(i);
      }
      if (checkIfWinner()) {
        return; // Stop verdere zetten als er een winnaar is
      }
      if (checkDraw()) {
        showMessage("Gelijkspel!");
        return; // Stop verdere zetten als er een gelijkspel is
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
}

function checkIfWinner() {
  let vakjes;

  if (currentPlayer === "X") {
    vakjes = xVakjes;
  } else {
    vakjes = oVakjes;
  }

  for (let i = 0; i < winningCombinations.length; i++) {
    const winningCombo = winningCombinations[i];
    let playerHasWon = true;

    for (let j = 0; j < winningCombo.length; j++) {
      const winningNumber = winningCombo[j];
      const hasWinningNumber = vakjes.includes(winningNumber);

      if (!hasWinningNumber) {
        playerHasWon = false;
      }
    }
    
    if (playerHasWon) {
      showMessage("Player " + currentPlayer + " has won!");
      return true; // Er is een winnaar gevonden
    }
  }

  return false; // Geen winnaar gevonden
}

function checkDraw() {
  // Als alle vakjes bezet zijn en er geen winnaar is
  for (let i = 0; i < vakjes.length; i++) {
    if (vakjes[i].textContent === "") {
      return false; // Er zijn nog lege vakjes
    }
  }
  return true; // Geen lege vakjes meer, dus gelijkspel
}

function showMessage(message) {
  messageBox.textContent = message;
  messageBox.style.display = "block";
}

const winningCombinations = [
  [0, 1, 2], // Rij 1: vakje 1, vakje 2, vakje 3
  [3, 4, 5], // Rij 2: vakje 4, vakje 5, vakje 6
  [6, 7, 8], // Rij 3: vakje 7, vakje 8, vakje 9
  [0, 3, 6], // Kolom 1: vakje 1, vakje 4, vakje 7
  [1, 4, 7], // Kolom 2: vakje 2, vakje 5, vakje 8
  [2, 5, 8], // Kolom 3: vakje 3, vakje 6, vakje 9
  [0, 4, 8], // Diagonaal 1: vakje 1, vakje 5, vakje 9
  [2, 4, 6], // Diagonaal 2: vakje 3, vakje 5, vakje 7
];


