console.log("Main loaded");
// Haal alle vakken op met querySelectorAll
const vakjes = document.querySelectorAll(".vakje");
console.log(vakjes);
 
//for (let i = 0; i < vakjes.length; i++) {
 // const vakje = vakjes[i];
  //vakje.addEventListener("click", function () {
    //vakje.textContent = "O";
  //});
//}
let currentPlayer = 'X'
for (let i = 0; i < vakjes.length; i++) {
  const vakje = vakjes[i];
  vakje.addEventListener('click', function () {
    // Als het vakje nog leeg is, voeg de zet van de huidige speler toe
    if (vakje.textContent === '') {
      vakje.textContent = currentPlayer;
 
      // Wissel de beurt na elke zet
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
}

