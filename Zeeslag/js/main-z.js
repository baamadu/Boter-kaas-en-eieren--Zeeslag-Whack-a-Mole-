let selectedBoat = null;
let boot1Count = 0;
let boot2Count = 0;
let boot3Count = 0;
let computerBoatCount = 0;
let playerTurn = true;

document.querySelectorAll(".bootje").forEach((boot) => {
  boot.addEventListener("click", function () {
    if (selectedBoat === this) {
      selectedBoat = null;
      this.classList.remove("selected");
      alert("Boot gedeselecteerd");
    } else {
      if (selectedBoat) {
        selectedBoat.classList.remove("selected");
      }
      selectedBoat = this;
      this.classList.add("selected");
      alert("Boot geselecteerd: " + this.id);
    }
  });
});

document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", function () {
    if (selectedBoat && playerTurn) {
      // Controleer de limieten voor het aantal boten
      if (selectedBoat.id === "boot1" && boot1Count >= 2) {
        alert("Je kunt maximaal 2 boten van boot 1 plaatsen.");
        return;
      }
      if (selectedBoat.id === "boot2" && boot2Count >= 3) {
        alert("Je kunt maximaal 3 boten van boot 2 plaatsen.");
        return;
      }
      if (selectedBoat.id === "boot3" && boot3Count >= 4) {
        alert("Je kunt maximaal 4 boten van boot 3 plaatsen.");
        return;
      }
      
      // Boot plaatsen
      const bootClone = selectedBoat.cloneNode(true);
      box.innerHTML = ""; // Maak het vakje leeg
      box.appendChild(bootClone); // Plaats de geselecteerde boot in het vakje
      selectedBoat.classList.remove("selected"); // Verwijder de selectie van de boot
      selectedBoat = null; // Zet de geselecteerde boot terug naar null

      // Verhoog de teller voor het juiste type boot
      if (bootClone.id === "boot1") {
        boot1Count++;
      } else if (bootClone.id === "boot2") {
        boot2Count++;
      } else if (bootClone.id === "boot3") {
        boot3Count++;
      }

      alert("Boot geplaatst!");

      // Controleer of de speler klaar is met plaatsen (max 9 boten in totaal)
      if (boot1Count + boot2Count + boot3Count === 9) {
        alert("Alle boten zijn geplaatst. Nu is het de beurt van de computer.");
        playerTurn = false;
        computerTurn();
      }
    } else if (!playerTurn) {
      // Computer beurt
      const boxes = document.querySelectorAll(".box");
      const emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
      
      if (emptyBoxes.length > 0) {
        const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        const computerBoot = document.querySelector(".computer-boot");
        const computerBootClone = computerBoot.cloneNode(true);
        randomBox.innerHTML = ""; // Maak het vakje leeg
        randomBox.appendChild(computerBootClone); // Plaats de computer boot in het vakje
        computerBoatCount++;

        // Controleer of de computer klaar is met plaatsen (max 9 boten in totaal)
        if (computerBoatCount === 9) {
          alert("Alle computer boten zijn geplaatst. Nu kan je de computer boten vernietigen.");
          playerTurn = true;
        } else {
          computerTurn();
        }
      }
    } else {
      alert("Selecteer eerst een boot!");
    }
  });
});

function computerTurn() {
  // Simuleer de computer beurt door een willekeurige lege box te klikken
  const boxes = document.querySelectorAll(".box");
  const emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
  
  if (emptyBoxes.length > 0) {
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.click();
  }
}
