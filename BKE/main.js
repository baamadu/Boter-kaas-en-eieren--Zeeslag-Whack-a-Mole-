console.log("Main loaded");

// Haal alle vakken op met querySelectorAll
const vakjes = document.querySelectorAll(".vakje");
console.log(vakjes);

// Houd de huidige speler bij: "X" begint
let currentPlayer = "X";

// Voeg event listeners toe aan elk vakje
for (let i = 0; i < vakjes.length; i++) {
  const vakje = vakjes[i];

  vakje.addEventListener("click", function () {
    // Controleer of het vakje al een waarde heeft
    if (vakje.textContent === "") {
      vakje.textContent = currentPlayer; // Zet de tekst in het vakje naar de huidige speler

      // Wissel de beurt
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
}
