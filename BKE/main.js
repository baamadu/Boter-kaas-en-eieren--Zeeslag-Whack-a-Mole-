console.log("Main loaded");
// Haal alle vakken op met querySelectorAll
const vakjes = document.querySelectorAll(".vakje");
console.log(vakjes);
 
const xVakjes = [];
const oVakjes = [];
 
currentPlayer = "X";
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
      checkIfWinner();
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
    // bijvoorbeeld: [0,1,2]
    const winningCombo = winningCombinations[i];
 
    // houdt bij of de speler gewonnen heeft.
    // wordt false zodra een van de combo nummbers niet in de vakjes array zit
    let playerHasWon = true;
 
    for (let j = 0; j < winningCombo.length; j++) {
      // bijvoorbeeld 0 of 1 of 2
      const winningNumber = winningCombo[j];
 
      // kijk of het nummber uit de winnende combo in de array van de huidige player zijn vakjes zit
      const hasWinningNumber = vakjes.includes(winningNumber);
 
      if (hasWinningNumber == false) {
        playerHasWon = false;
      }
    }
 
    console.log("Player", currentPlayer, "has won", playerHasWon);
  }
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


const playerOne = {
  name: 'Amadu',
  age: 17,
  points: 0
};

// Zet de spelergegevens om naar JSON en sla ze op in localStorage
function savePlayerData(player) {
  const playerJSON = JSON.stringify(player);
  localStorage.setItem('playerOne', playerJSON);
}




