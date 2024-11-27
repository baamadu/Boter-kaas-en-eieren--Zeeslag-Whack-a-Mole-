console.log("Main loaded");
// Haal alle vakken op met querySelectorAll
const vakjes = document.querySelectorAll(".vakje");
console.log(vakjes);

 currentPlayer = "X";
for (let i = 0; i < vakjes.length; i++) {
  const vakje = vakjes[i];
  vakje.addEventListener("click", function () {
    if (vakje.textContent === "") {
      vakje.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
}

//De mogelijke winnende combinaties:

//Horizontaal:
//Rij 1: vakje 1, vakje 2, vakje 3
//Rij 2: vakje 4, vakje 5, vakje 6
//Rij 3: vakje 7, vakje 8, vakje 9
//Verticaal:
//Kolom 1: vakje 1, vakje 4, vakje 7
//Kolom 2: vakje 2, vakje 5, vakje 8
//Kolom 3: vakje 3, vakje 6, vakje 9
//Diagonalen:
//Diagonaal 1: vakje 1, vakje 5, vakje 9
//Diagonaal 2: vakje 3, vakje 5, vakje 7