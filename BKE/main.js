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
let currentPlayer = "X";
for (let i = 0; i < vakjes.length; i++) {
  const vakje = vakjes[i];
  vakje.addEventListener("click", function () {
    if (vakje.textContent === "") {
      vakje.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
}
